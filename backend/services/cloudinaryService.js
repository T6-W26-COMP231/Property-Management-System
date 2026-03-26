const cloudinary = require("cloudinary").v2;



// ── Upload image (profile photos, property photos, maintenance photos) ────────
const uploadImage = async (base64, folder, options = {}) => {
  const result = await cloudinary.uploader.upload(base64, {
    folder,
    resource_type: "image",
    ...options,
  });
  return {
    url:      result.secure_url,
    publicId: result.public_id,
  };
};

// ── Upload PDF (lease documents) ──────────────────────────────────────────────
const uploadPDF = async (base64, folder, fileName, options = {}) => {
  const result = await cloudinary.uploader.upload(base64, {
    folder,
    resource_type: "raw",
    flags:         "attachment",
    public_id:     fileName,
    ...options,
  });
  return {
    url:      result.secure_url,
    publicId: result.public_id,
    fileName: fileName || "document.pdf",
  };
};

// ── Delete file by publicId ───────────────────────────────────────────────────
const deleteFile = async (publicId, resourceType = "image") => {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

// ── Delete PDF by publicId ────────────────────────────────────────────────────
const deletePDF = async (publicId) => {
  await deleteFile(publicId, "raw");
};

// ── Upload profile photo (auto crop to face) ──────────────────────────────────
const uploadProfilePhoto = async (base64) => {
  return uploadImage(base64, "t6pms/profiles", {
    transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
  });
};

// ── Upload property photo ─────────────────────────────────────────────────────
const uploadPropertyPhoto = async (base64) => {
  return uploadImage(base64, "t6pms/properties");
};

// ── Upload lease document PDF ─────────────────────────────────────────────────
const uploadLeaseDocument = async (base64, propertyId, residentId, fileName) => {
  const safeId = `lease_${propertyId}_${residentId}`.replace(/\|/g, "_");
  return uploadPDF(base64, "t6pms/leases", safeId, {
    display_name: fileName || "lease_agreement.pdf",
  });
};

// ── Upload maintenance photo ──────────────────────────────────────────────────
const uploadMaintenancePhoto = async (base64) => {
  return uploadImage(base64, "t6pms/maintenance");
};

module.exports = {
  uploadImage,
  uploadPDF,
  deleteFile,
  deletePDF,
  uploadProfilePhoto,
  uploadPropertyPhoto,
  uploadLeaseDocument,
  uploadMaintenancePhoto,
};