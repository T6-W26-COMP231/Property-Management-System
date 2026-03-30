const cloudinary  = require("cloudinary").v2;
const Maintenance = require("../models/Maintenance");
const Assignment  = require("../models/Assignment");
const User        = require("../models/User");
const Profile     = require("../models/Profile");

// ── POST /api/maintenance — resident submits a request ───────────────────────
const createRequest = async (req, res) => {
  try {
    const residentId = req.auth.payload.sub;
    const { subject, description, priority, photos } = req.body;

    if (!subject?.trim())     return res.status(400).json({ error: "Subject is required" });
    if (!description?.trim()) return res.status(400).json({ error: "Description is required" });

    // Find resident's active assignment to get propertyId + landlordId
    const assignment = await Assignment.findOne({ residentId, status: "active" });
    if (!assignment) {
      return res.status(404).json({ error: "No active property assignment found. Contact your landlord." });
    }

    // Upload photos to Cloudinary (max 3)
    const uploadedPhotos = [];
    if (photos && photos.length > 0) {
      const toUpload = photos.slice(0, 3);
      for (const base64 of toUpload) {
        const uploaded = await cloudinary.uploader.upload(base64, {
          folder: "t6pms/maintenance",
        });
        uploadedPhotos.push({ url: uploaded.secure_url, publicId: uploaded.public_id });
      }
    }

    const request = await Maintenance.create({
      residentId,
      propertyId:  assignment.propertyId,
      landlordId:  assignment.landlordId,
      subject:     subject.trim(),
      description: description.trim(),
      priority:    priority || "Standard",
      photos:      uploadedPhotos,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error("createRequest error:", err);
    res.status(500).json({ error: "Failed to submit request" });
  }
};

// ── GET /api/maintenance/my — resident gets their own requests ────────────────
const getMyRequests = async (req, res) => {
  try {
    const residentId = req.auth.payload.sub;
    const requests   = await Maintenance
      .find({ residentId })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("getMyRequests error:", err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// ── GET /api/maintenance/property/:propertyId — landlord gets all requests ────
const getPropertyRequests = async (req, res) => {
  try {
    const landlordId = req.auth.payload.sub;
    const requests   = await Maintenance
      .find({ propertyId: req.params.propertyId, landlordId })
      .sort({ createdAt: -1 });

    // Enrich with resident email + profile photo
    const enriched = await Promise.all(
      requests.map(async (r) => {
        const user    = await User.findOne({ auth0Id: r.residentId });
        const profile = await Profile.findOne({ auth0Id: r.residentId });

        // Get property location
        const Property = require("../models/Property");
        const property = await Property.findById(r.propertyId);

        return {
          ...r.toObject(),
          residentEmail: user?.email           || "",
          residentPhoto: profile?.photo?.url   || user?.picture || "",
          propertyLocation: property?.location || "",
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error("getPropertyRequests error:", err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// ── PATCH /api/maintenance/:id/status — landlord updates status ───────────────
const updateStatus = async (req, res) => {
  try {
    const landlordId = req.auth.payload.sub;
    const { status } = req.body;

    if (!["Submitted", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const request = await Maintenance.findById(req.params.id);
    if (!request)                       return res.status(404).json({ error: "Request not found" });
    if (request.landlordId !== landlordId) return res.status(403).json({ error: "Access denied" });

    request.status = status;
    await request.save();

    // Send real-time notification to resident
    const { sendNotification } = require("./notificationController");
    await sendNotification({
      userId:  request.residentId,
      type:    "maintenance_status",
      title:   "Maintenance Request Updated",
      message: `Your request "${request.subject}" status changed to "${status}".`,
      data:    { requestId: request._id, status, subject: request.subject },
    });

    res.json(request);
  } catch (err) {
    console.error("updateStatus error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// ── DELETE /api/maintenance/:id — resident deletes their own request ──────────
const deleteRequest = async (req, res) => {
  try {
    const residentId = req.auth.payload.sub;
    const request    = await Maintenance.findById(req.params.id);

    if (!request)                        return res.status(404).json({ error: "Request not found" });
    if (request.residentId !== residentId) return res.status(403).json({ error: "Access denied" });

    // Delete photos from Cloudinary
    for (const photo of request.photos) {
      if (photo.publicId) {
        await cloudinary.uploader.destroy(photo.publicId);
      }
    }

    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("deleteRequest error:", err);
    res.status(500).json({ error: "Failed to delete request" });
  }
};

module.exports = { createRequest, getMyRequests, getPropertyRequests, updateStatus, deleteRequest };
