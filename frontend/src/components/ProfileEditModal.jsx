import { useState, useRef, useEffect } from "react";

const DEFAULT_AVATAR = "https://placehold.co/100x100/cccccc/ffffff?text=No+Photo";

export const JOB_TYPES = [
  "Plumber",
  "House Cleaner",
  "Electrician",
  "HVAC Technician",
  "Carpenter",
  "Painter",
  "Roofer",
  "Landscaper",
  "Pest Control",
  "Appliance Repair",
  "Locksmith",
  "General Handyman",
];

export default function ProfileEditModal({
  show = false,
  profile = null,
  saving = false,
  error = "",
  onSave = () => {},
  onClose = () => {},
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    jobType: "",
    photoPreview: "",
  });

  const fileRef = useRef(null);

  useEffect(() => {
    if (show && profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        contactNumber: profile.contactNumber || "",
        address: profile.address || "",
        city: profile.city || "",
        state: profile.state || "",
        jobType: profile.jobType || "",
        photoPreview: profile.photo?.url || "",
      });
    }
  }, [show, profile]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, photoPreview: preview }));
  };

  const handleSave = () => {
    if (!form.firstName || !form.email) {
      return alert("First name and email are required");
    }

    onSave(form);
  };

  const isContractor = profile?.role === "contractor";

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Edit Profile</h5>
            <button className="btn-close" onClick={onClose} disabled={saving} />
          </div>

          <div className="modal-body">

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            {/* Photo */}
            <div className="text-center mb-3">
              <img
                src={form.photoPreview || DEFAULT_AVATAR}
                alt="preview"
                className="rounded-circle mb-2"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <br />
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => fileRef.current.click()}
              >
                Change Photo
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handlePhotoChange}
              />
            </div>

            <div className="row g-2">
              <div className="col-md-6">
                <input className="form-control" name="firstName"
                  placeholder="First Name"
                  value={form.firstName} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input className="form-control" name="lastName"
                  placeholder="Last Name"
                  value={form.lastName} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input className="form-control" name="email"
                  placeholder="Email"
                  value={form.email} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input className="form-control" name="contactNumber"
                  placeholder="Phone"
                  value={form.contactNumber} onChange={handleChange} />
              </div>
              <div className="col-12">
                <input className="form-control" name="address"
                  placeholder="Address"
                  value={form.address} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input className="form-control" name="city"
                  placeholder="City"
                  value={form.city} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input className="form-control" name="state"
                  placeholder="State"
                  value={form.state} onChange={handleChange} />
              </div>

              {isContractor && (
                <div className="col-12">
                  <select
                    className="form-select"
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                  >
                    <option value="">Select job type</option>
                    {JOB_TYPES.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}