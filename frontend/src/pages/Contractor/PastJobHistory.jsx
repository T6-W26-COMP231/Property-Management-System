import { useState } from "react";
import { FAKE_PAST_JOBS, PRIORITY_CONFIG, STATUS_CONFIG } from "./fakeData";

const PER_PAGE = 6;

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ job, onClose }) {
  if (!job) return null;
  const priority = PRIORITY_CONFIG[job.priority] || PRIORITY_CONFIG["Standard"];
  const status   = STATUS_CONFIG[job.status]     || STATUS_CONFIG["Completed"];

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-clock-history me-2 text-success" />Past Job Details
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

            {/* Dates */}
            <div className="card border-0 bg-light rounded-3 mb-3">
              <div className="card-body p-3">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-muted small text-uppercase fw-semibold mb-1">Submitted</div>
                    <div className="fw-semibold">
                      <i className="bi bi-calendar me-1" />{job.date}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-muted small text-uppercase fw-semibold mb-1">Completed</div>
                    <div className="fw-semibold text-success">
                      <i className="bi bi-calendar-check me-1" />{job.completedDate}
                    </div>
                  </div>
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
            <div className="text-muted small me-auto">
              <i className="bi bi-check-circle text-success me-1" />
              Completed on {job.completedDate}
            </div>
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PastJobHistory() {
  const [viewJob, setViewJob] = useState(null);
  const [page,    setPage]    = useState(1);

  const jobs       = FAKE_PAST_JOBS;
  const totalPages = Math.ceil(jobs.length / PER_PAGE);
  const paginated  = jobs.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Past Job History</h4>
        <p className="text-muted small mb-0">
          All completed maintenance jobs
          <span className="badge bg-success ms-2">{jobs.length} completed</span>
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-clock-history fs-1 d-block mb-2 opacity-50" />
          <p>No completed jobs yet.</p>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            {paginated.map((j) => {
              const priority  = PRIORITY_CONFIG[j.priority] || PRIORITY_CONFIG["Standard"];
              const cardImage = j.photo || `https://placehold.co/400x200/e9ecef/6c757d?text=${encodeURIComponent(j.priority)}`;
              return (
                <div key={j.id} className="col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="position-relative">
                      <img
                        src={cardImage}
                        alt={j.subject}
                        className="card-img-top"
                        style={{ height: 180, objectFit: "cover" }}
                      />
                      {/* Completed overlay badge */}
                      <span
                        className="position-absolute top-0 end-0 m-2 badge bg-success"
                      >
                        <i className="bi bi-check-circle me-1" />Completed
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="d-flex gap-1 flex-wrap mb-2">
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
                        <i className="bi bi-calendar-check text-success me-1" />
                        Completed: {j.completedDate}
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top-0 pb-3 px-3">
                      <button
                        className="btn btn-outline-primary btn-sm w-100"
                        onClick={() => setViewJob(j)}
                      >
                        <i className="bi bi-eye me-1" />View Details
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
    </div>
  );
}
