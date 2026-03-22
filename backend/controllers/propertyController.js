import { create, find, findById } from "../models/Property.model";
import { findByIdAndUpdate, findById as _findById } from "../models/User.model";

// POST /api/properties
// Landlord adds a new property
const createProperty = async (req, res) => {
  try {
    const landlordId = req.user._id; // from auth middleware

    const { address, description } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const property = await create({
      landlordId,
      address,
      description,
    });

    return res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("createProperty error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/properties 
// Landlord views all their properties
const getLandlordProperties = async (req, res) => {
  try {
    const landlordId = req.user._id;

    const properties = await find({ landlordId })
      .populate("residentId", "firstName lastName email phoneNumber")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("getLandlordProperties error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET /api/properties/:id
// Landlord or Resident views a specific property
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    const property = await findById(id)
      .populate("landlordId", "firstName lastName email phoneNumber")
      .populate("residentId", "firstName lastName email phoneNumber");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Access control: only the assigned landlord or resident can view
    const isLandlord = property.landlordId._id.toString() === userId.toString();
    const isResident =
      property.residentId &&
      property.residentId._id.toString() === userId.toString();

    if (!isLandlord && !isResident) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({ property });
  } catch (error) {
    console.error("getPropertyById error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

//DELETE /api/properties/:id
// Landlord deletes a property
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordId = req.user._id;

    const property = await findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.landlordId.toString() !== landlordId.toString()) {
      return res.status(403).json({ message: "Access denied: not your property" });
    }

    // If a resident is assigned, clear their assignedProperty reference
    if (property.residentId) {
      await findByIdAndUpdate(property.residentId, {
        $unset: { "profileDetails.assignedProperty": "" },
      });
    }

    await property.deleteOne();

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("deleteProperty error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

//PUT /api/properties/:id/assign
// Landlord assigns a resident and uploads lease document
const assignResident = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordId = req.user._id;

    const { residentId, leaseDocumentUrl, leaseDocumentExpireDate } = req.body;

    const property = await findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.landlordId.toString() !== landlordId.toString()) {
      return res.status(403).json({ message: "Access denied: not your property" });
    }

    // Validate that the resident exists and has the Resident role
    const resident = await _findById(residentId);

    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    if (resident.role !== "Resident") {
      return res.status(400).json({ message: "The specified user is not a Resident" });
    }

    // Update the property
    property.residentId = residentId;
    if (leaseDocumentUrl) property.leaseDocumentUrl = leaseDocumentUrl;
    if (leaseDocumentExpireDate) property.leaseDocumentExpireDate = leaseDocumentExpireDate;
    await property.save();

    // Update resident's assignedProperty
    await findByIdAndUpdate(residentId, {
      "profileDetails.assignedProperty": property._id,
    });

    const updated = await findById(id)
      .populate("residentId", "firstName lastName email");

    return res.status(200).json({
      message: "Resident assigned successfully",
      property: updated,
    });
  } catch (error) {
    console.error("assignResident error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET /api/properties/:id/rent-status
// Landlord views the rent status of a specific property
const getRentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordId = req.user._id;

    const property = await findById(id)
      .select("address rentStatus residentId leaseDocumentExpireDate")
      .populate("residentId", "firstName lastName email");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.landlordId && property.landlordId.toString() !== landlordId.toString()) {
      return res.status(403).json({ message: "Access denied: not your property" });
    }

    return res.status(200).json({
      propertyId: property._id,
      address: property.address,
      rentStatus: property.rentStatus,
      resident: property.residentId,
      leaseExpiry: property.leaseDocumentExpireDate,
    });
  } catch (error) {
    console.error("getRentStatus error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default {
  createProperty,
  getLandlordProperties,
  getPropertyById,
  deleteProperty,
  assignResident,
  getRentStatus,
};