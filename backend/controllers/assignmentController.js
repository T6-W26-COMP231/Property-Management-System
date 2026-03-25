const cloudinary  = require("cloudinary").v2;
const Assignment  = require("../models/Assignment");
const User        = require("../models/User");
const Profile     = require("../models/Profile");

// ── GET /api/assignments/:propertyId — list all residents in a property ───────
const getAssignments = async (req, res) => {
  try {
    const landlordId = req.auth.payload.sub;
    const { propertyId } = req.params;

    const assignments = await Assignment
      .find({ propertyId, landlordId })
      .sort({ createdAt: -1 });

    // Enrich with resident profile info
    const enriched = await Promise.all(
      assignments.map(async (a) => {
        const user    = await User.findOne({ auth0Id: a.residentId });
        const profile = await Profile.findOne({ auth0Id: a.residentId });
        return {
          ...a.toObject(),
          resident: {
            auth0Id:       a.residentId,
            name:          user?.name            || "",
            email:         user?.email           || "",
            firstName:     profile?.firstName    || "",
            lastName:      profile?.lastName     || "",
            contactNumber: profile?.contactNumber|| "",
            address:       profile?.address      || "",
            city:          profile?.city         || "",
            state:         profile?.state        || "",
            photo:         profile?.photo?.url   || user?.picture || "",
          },
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error("getAssignments error:", err);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

// ── POST /api/assignments/:propertyId — assign resident to property ───────────
const createAssignment = async (req, res) => {
  try {
    const landlordId          = req.auth.payload.sub;
    const { propertyId }      = req.params;
    const { residentEmail, leaseExpireDate, leaseDocumentBase64, leaseDocumentName } = req.body;

    if (!residentEmail || !leaseExpireDate) {
      return res.status(400).json({ error: "Resident email and lease expire date are required" });
    }

    // Find resident by email
    const residentUser = await User.findOne({ email: residentEmail.toLowerCase(), role: "resident" });
    if (!residentUser) {
      return res.status(404).json({ error: "No resident found with that email address" });
    }

    // Check if resident is already assigned
    const existing = await Assignment.findOne({ residentId: residentUser.auth0Id });
    if (existing) {
      return res.status(400).json({ error: "This resident is already assigned to a property" });
    }

    // Upload lease document to Cloudinary
    let leaseDocument = { url: "", publicId: "", fileName: "" };
    if (leaseDocumentBase64) {
      const uploaded = await cloudinary.uploader.upload(leaseDocumentBase64, {
        folder:        "t6pms/leases",
        resource_type: "raw",
        public_id:     `lease_${propertyId}_${residentUser.auth0Id.replace("|", "_")}`,
        flags:         "attachment", // forces browser to download instead of preview
      });
      leaseDocument = {
        url:      uploaded.secure_url,
        publicId: uploaded.public_id,
        fileName: leaseDocumentName || "lease.pdf",
      };
    }

    const assignment = await Assignment.create({
      propertyId,
      landlordId,
      residentId:      residentUser.auth0Id,
      leaseExpireDate: new Date(leaseExpireDate),
      leaseDocument,
    });

    // Return enriched
    const profile = await Profile.findOne({ auth0Id: residentUser.auth0Id });
    res.status(201).json({
      ...assignment.toObject(),
      resident: {
        auth0Id:       residentUser.auth0Id,
        name:          residentUser.name,
        email:         residentUser.email,
        firstName:     profile?.firstName     || "",
        lastName:      profile?.lastName      || "",
        contactNumber: profile?.contactNumber || "",
        address:       profile?.address       || "",
        city:          profile?.city          || "",
        state:         profile?.state         || "",
        photo:         profile?.photo?.url    || residentUser.picture || "",
      },
    });
  } catch (err) {
    console.error("createAssignment error:", err);
    res.status(500).json({ error: "Failed to assign resident" });
  }
};

// ── PUT /api/assignments/:assignmentId — update lease doc and expire date ──────
const updateAssignment = async (req, res) => {
  try {
    const landlordId = req.auth.payload.sub;
    const assignment = await Assignment.findById(req.params.assignmentId);

    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    if (assignment.landlordId !== landlordId) return res.status(403).json({ error: "Access denied" });

    const { leaseExpireDate, leaseDocumentBase64, leaseDocumentName } = req.body;

    if (leaseExpireDate) assignment.leaseExpireDate = new Date(leaseExpireDate);

    // Upload new lease document if provided
    if (leaseDocumentBase64) {
      if (assignment.leaseDocument?.publicId) {
        await cloudinary.uploader.destroy(assignment.leaseDocument.publicId, { resource_type: "raw" });
      }
      const uploaded = await cloudinary.uploader.upload(leaseDocumentBase64, {
        folder:        "t6pms/leases",
        resource_type: "raw",
        flags:         "attachment",
        public_id:     `lease_${assignment.propertyId}_${assignment.residentId.replace("|", "_")}`,
      });
      assignment.leaseDocument = {
        url:      uploaded.secure_url,
        publicId: uploaded.public_id,
        fileName: leaseDocumentName || "lease.pdf",
      };
    }

    await assignment.save();

    // Return enriched
    const user    = await User.findOne({ auth0Id: assignment.residentId });
    const profile = await Profile.findOne({ auth0Id: assignment.residentId });
    res.json({
      ...assignment.toObject(),
      resident: {
        auth0Id:       assignment.residentId,
        name:          user?.name            || "",
        email:         user?.email           || "",
        firstName:     profile?.firstName    || "",
        lastName:      profile?.lastName     || "",
        contactNumber: profile?.contactNumber|| "",
        address:       profile?.address      || "",
        city:          profile?.city         || "",
        state:         profile?.state        || "",
        photo:         profile?.photo?.url   || user?.picture || "",
      },
    });
  } catch (err) {
    console.error("updateAssignment error:", err);
    res.status(500).json({ error: "Failed to update assignment" });
  }
};

// ── DELETE /api/assignments/:assignmentId — remove resident from property ──────
const deleteAssignment = async (req, res) => {
  try {
    const landlordId = req.auth.payload.sub;
    const assignment = await Assignment.findById(req.params.assignmentId);

    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    if (assignment.landlordId !== landlordId) return res.status(403).json({ error: "Access denied" });

    // Delete lease document from Cloudinary
    if (assignment.leaseDocument?.publicId) {
      await cloudinary.uploader.destroy(assignment.leaseDocument.publicId, { resource_type: "raw" });
    }

    await Assignment.findByIdAndDelete(req.params.assignmentId);
    res.json({ message: "Resident removed from property" });
  } catch (err) {
    console.error("deleteAssignment error:", err);
    res.status(500).json({ error: "Failed to remove assignment" });
  }
};

module.exports = { getAssignments, createAssignment, updateAssignment, deleteAssignment };
