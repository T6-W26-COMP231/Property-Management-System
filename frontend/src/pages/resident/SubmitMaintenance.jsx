import { useState, useRef } from "react";
import Alert from "../../components/Alert";

const PRIORITIES = ["Standard", "Urgent", "Emergency"];

const PRIORITY_INFO = {
  Standard:  { badge: "info",    icon: "bi-flag",                        desc: "Non-urgent, routine maintenance"          },
  Urgent:    { badge: "warning", icon: "bi-flag-fill",                   desc: "Needs attention soon, affects daily life" },
  Emergency: { badge: "danger",  icon: "bi-exclamation-triangle-fill",   desc: "Immediate risk to safety or property"     },
};

const MAX_PHOTOS = 3;

export default function SubmitMaintenance() {
  const [subject,     setSubject]     = useState("");
  const [description, setDescription] = useState("");
  const [priority,    setPriority]    = useState("Standard");
  const [photos,      setPhotos]      = useState([]);   // [{ file, preview }]
  const [alert,       setAlert]       = useState({ type: "", message: "" });
  const fileRef = useRef(null);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_PHOTOS - photos.length;
    const toAdd     = files.slice(0, remaining);

    const newPhotos = toAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name:    file.name,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = ""; // reset input so same file can be re-selected
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!subject.trim()) {
      setAlert({ type: "warning", message: "Please enter a subject." });
      return;
    }
    if (!description.trim()) {
      setAlert({ type: "warning", message: "Please enter a description." });
      return;
    }
    // Fake submit — just show success
    setAlert({ type: "success", message: "Maintenance request submitted successfully!" });
    setSubject("");
    setDescription("");
    setPriority("Standard");
    setPhotos([]);
  };

  const selectedPriority = PRIORITY_INFO[priority];

  return (
    <div className="p-4" style={{ maxWidth: 720 }}>

      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Submit Maintenance Request</h4>
        <p className="text-muted small">Describe the issue and we'll get it resolved as soon as possible.</p>
      </div>

      <Alert
        type={alert.type}
        message={alert.message}
        dismissible
        autoDismiss
        onDismiss={() => setAlert({ type: "", message: "" })}
      />

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="row g-4">

            {/* Subject */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Subject <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                placeholder="e.g. Heater not working in bedroom"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={100}
              />
              <div className="text-muted small mt-1">{subject.length}/100</div>
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Please describe the issue in detail. Include when it started, how severe it is, and any relevant information..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1000}
              />
              <div className="text-muted small mt-1">{description.length}/1000</div>
            </div>

            {/* Priority */}
            <div className="col-12">
              <label className="form-label fw-semibold">Priority</label>
              <select
                className="form-select mb-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              {/* Priority info banner */}
              <div className={`alert alert-${selectedPriority.badge} d-flex align-items-center gap-2 py-2 mb-0`}>
                <i className={`bi ${selectedPriority.icon}`} />
                <span className="small">{selectedPriority.desc}</span>
              </div>
            </div>

            {/* Photo upload */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Photos
                <span className="text-muted fw-normal ms-2 small">(max {MAX_PHOTOS})</span>
              </label>

              {/* Upload button */}
              {photos.length < MAX_PHOTOS && (
                <div
                  className="border border-2 border-dashed rounded-3 text-center py-4 mb-3"
                  style={{ cursor: "pointer", borderStyle: "dashed !important" }}
                  onClick={() => fileRef.current.click()}
                >
                  <i className="bi bi-cloud-upload text-primary fs-2 d-block mb-2" />
                  <div className="fw-semibold text-primary">Click to upload photos</div>
                  <div className="text-muted small">
                    {photos.length}/{MAX_PHOTOS} photos added · JPG, PNG, WEBP
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="d-none"
                    onChange={handlePhotoChange}
                  />
                </div>
              )}

              {/* Photo previews */}
              {photos.length > 0 && (
                <div className="row g-3">
                  {photos.map((photo, i) => (
                    <div key={i} className="col-4">
                      <div className="position-relative">
                        <img
                          src={photo.preview}
                          alt={photo.name}
                          className="rounded-3 w-100"
                          style={{ height: 120, objectFit: "cover" }}
                        />
                        <button
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-0"
                          style={{ width: 24, height: 24, fontSize: 12 }}
                          onClick={() => removePhoto(i)}
                        >
                          <i className="bi bi-x" />
                        </button>
                        <div className="text-muted text-truncate mt-1" style={{ fontSize: 11 }}>
                          {photo.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="card-footer bg-transparent border-top p-4 d-flex justify-content-end gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setSubject("");
              setDescription("");
              setPriority("Standard");
              setPhotos([]);
              setAlert({ type: "", message: "" });
            }}
          >
            <i className="bi bi-x-lg me-1" />Clear
          </button>
          <button className="btn btn-success" onClick={handleSubmit}>
            <i className="bi bi-send me-1" />Submit Request
          </button>
        </div>
      </div>

    </div>
  );
}
