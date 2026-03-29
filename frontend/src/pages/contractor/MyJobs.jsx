import { useState } from "react";
import { FAKE_MY_JOBS, PRIORITY_CONFIG, STATUS_CONFIG } from "./fakeData";

const PER_PAGE      = 6;
const STATUS_OPTIONS = ["Submitted", "In Progress", "Completed"];

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ job, onClose }) {
  if (!job) return null;
  const priority = PRIORITY_CONFIG[job.priority] || PRIORITY_CONFIG["Standard"];
  const status   = STATUS_CONFIG[job.status]     || STATUS_CONFIG["Submitted"];

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-briefcase me-2 text-primary" />Job Details
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body p-4">

            <div className="d-flex gap-2 flex-wrap mb-4">
              <span className={`badge bg-${status.badge} fs-6 px-3 py-2`}>
                <i className={`bi ${status.icon} me-1`} />{job.status}
              </span>
              <span className={`badge bg-${priority.badge} fs-6 px-3 py-2`}>
                <i className={`bi ${priority.icon} me-1`} />{job.priority}
              </span>
            </div>

            <div className="card border-0 bg-light rounded-3 mb-3">
              <div className="card-body p-3">
                <div className="text-muted small text-uppercase fw-semibold mb-1">Subject</div>
                <div className="fw-bold mb-3">{job.subject}</div>
                <div className="text-muted small text-uppercase fw-semibold mb-1">Description</div>
                <div className="text-muted" style={{ lineHeight: 1.7 }}>{job.description}</div>
              </div>
            </div>

            <div className="card border-0 bg-light rounded-3 mb-3">
              <div className="card-body p-3">
                <div className="text-muted small text-uppercase fw-semibold mb-1">Property Location</div>
                <div className="fw-semibold">
                  <i className="bi bi-geo-alt text-danger me-1" />{job.location}
                </div>
              </div>
            </div>

            <div className="card border-0 bg-light rounded-3 mb-3">
              <div className="card-header bg-transparent border-bottom fw-semibold small py-2 px-3">
                <i className="bi bi-person-badge me-1" />Landlord
              </div>
              <div className="card-body p-3 d-flex align-items-center gap-3">
                <img
                  src={job.landlord.photo}
                  alt={job.landlord.name}
                  className="rounded-circle border"
                  width={48} height={48}
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <div className="fw-semibold">{job.landlord.name}</div>
                  <div className="text-muted small">
                    <i className="bi bi-envelope me-1" />{job.landlord.email}
                  </div>
                </div>
              </div>
            </div>

            {job.photo && (
              <div className="card border-0 bg-light rounded-3">
                <div className="card-header bg-transparent border-bottom fw-semibold small py-2 px-3">
                  <i className="bi bi-image me-1" />Photo
                </div>
                <div className="card-body p-3">
                  <img
                    src={job.photo}
                    alt={job.subject}
                    className="rounded-3 w-100"
                    style={{ maxHeight: 200, objectFit: "cover" }}
                  />
                </div>
              </div>
            )}

          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Update Status Modal ───────────────────────────────────────────────────────
function UpdateStatusModal({ job, onSave, onClose }) {
  const [status, setStatus] = useState(job?.status || "Submitted");

  if (!job) return null;

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 420 }}>
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-pencil me-2 text-warning" />Update Status
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body p-4">

            {/* Job summary */}
            <div className="d-flex align-items-center gap-2 p-2 bg-light rounded-3 mb-4">
              <img
                src={job.landlord.photo}
                alt=""
                className="rounded-circle flex-shrink-0"
                width={36} height={36}
                style={{ objectFit: "cover" }}
              />
              <div>
                <div className="fw-semibold small text-truncate">{job.subject}</div>
                <div className="text-muted" style={{ fontSize: 11 }}>{job.landlord.email}</div>
              </div>
            </div>

            {/* Status options */}
            <div className="d-grid gap-2">
              {STATUS_OPTIONS.map((s) => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <div
                    key={s}
                    className={`card border-2 p-3 d-flex flex-row align-items-center gap-3 ${status === s ? `border-${cfg.badge} bg-${cfg.badge} bg-opacity-10` : "border"}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setStatus(s)}
                  >
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${status === s ? `bg-${cfg.badge}` : "bg-light"}`}
                      style={{ width: 36, height: 36 }}
                    >
                      <i className={`bi ${cfg.icon} ${status === s ? "text-white" : "text-muted"}`} />
                    </div>
                    <span className={`fw-semibold ${status === s ? `text-${cfg.badge}` : "text-muted"}`}>{s}</span>
                    {status === s && <i className={`bi bi-check2 text-${cfg.badge} ms-auto fs-5`} />}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-warning" onClick={() => { onSave(job.id, status); onClose(); }}>
              <i className="bi bi-check-lg me-1" />Save Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyJobs() {
  const [jobs,       setJobs]       = useState(FAKE_MY_JOBS);
  const [viewJob,    setViewJob]    = useState(null);
  const [updateJob,  setUpdateJob]  = useState(null);
  const [page,       setPage]       = useState(1);

  const handleUpdateStatus = (id, status) => {
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, status } : j));
  };

  const totalPages = Math.ceil(jobs.length / PER_PAGE);
  const paginated  = jobs.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1">My Jobs</h4>
        <p className="text-muted small mb-0">Maintenance requests you have accepted</p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-briefcase fs-1 d-block mb-2 opacity-50" />
          <p>No accepted jobs yet.</p>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            {paginated.map((j) => {
              const priority  = PRIORITY_CONFIG[j.priority] || PRIORITY_CONFIG["Standard"];
              const status    = STATUS_CONFIG[j.status]     || STATUS_CONFIG["Submitted"];
              const cardImage = j.photo || `https://placehold.co/400x200/e9ecef/6c757d?text=${encodeURIComponent(j.priority)}`;
              return (
                <div key={j.id} className="col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm h-100">
                    <img
                      src={cardImage}
                      alt={j.subject}
                      className="card-img-top"
                      style={{ height: 180, objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <div className="d-flex gap-1 flex-wrap mb-2">
                        <span className={`badge bg-${status.badge}`}>
                          <i className={`bi ${status.icon} me-1`} />{j.status}
                        </span>
                        <span className={`badge bg-${priority.badge}`}>
                          <i className={`bi ${priority.icon} me-1`} />{j.priority}
                        </span>
                      </div>
                      <h6 className="fw-bold mb-2 text-truncate">{j.subject}</h6>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <img
                          src={j.landlord.photo}
                          alt={j.landlord.name}
                          className="rounded-circle border flex-shrink-0"
                          width={24} height={24}
                          style={{ objectFit: "cover" }}
                        />
                        <span className="text-muted small text-truncate">{j.landlord.email}</span>
                      </div>
                      <div className="text-muted small">
                        <i className="bi bi-calendar me-1" />{j.date}
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top-0 pb-3 px-3 d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm flex-grow-1"
                        onClick={() => setViewJob(j)}
                      >
                        <i className="bi bi-eye me-1" />View
                      </button>
                      <button
                        className="btn btn-outline-warning btn-sm flex-grow-1"
                        onClick={() => setUpdateJob(j)}
                      >
                        <i className="bi bi-pencil me-1" />Status
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <nav className="d-flex justify-content-center">
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page - 1)}>
                    <i className="bi bi-chevron-left" />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(p)}>{p}</button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page + 1)}>
                    <i className="bi bi-chevron-right" />
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      <ViewModal job={viewJob} onClose={() => setViewJob(null)} />
      <UpdateStatusModal
        job={updateJob}
        onSave={handleUpdateStatus}
        onClose={() => setUpdateJob(null)}
      />
    </div>
  );
}
