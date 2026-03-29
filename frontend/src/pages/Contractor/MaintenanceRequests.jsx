import { useState } from "react";
import { FAKE_REQUESTS, PRIORITY_CONFIG, STATUS_CONFIG } from "./fakeData";

const PER_PAGE = 6;

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ request, onClose, onAccept, onDecline }) {
  if (!request) return null;
  const priority = PRIORITY_CONFIG[request.priority] || PRIORITY_CONFIG["Standard"];
  const status   = STATUS_CONFIG[request.status]     || STATUS_CONFIG["Submitted"];

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-clipboard-check me-2 text-primary" />Request Details
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body p-4">

            {/* Badges */}
            <div className="d-flex gap-2 flex-wrap mb-4">
              <span className={`badge bg-${status.badge} fs-6 px-3 py-2`}>
                <i className={`bi ${status.icon} me-1`} />{request.status}
              </span>
              <span className={`badge bg-${priority.badge} fs-6 px-3 py-2`}>
                <i className={`bi ${priority.icon} me-1`} />{request.priority}
              </span>
            </div>

            {/* Subject + description */}
            <div className="card border-0 bg-light rounded-3 mb-3">
              <div className="card-body p-3">
                <div className="text-muted small text-uppercase fw-semibold mb-1">Subject</div>
                <div className="fw-bold mb-3">{request.subject}</div>
                <div className="text-muted small text-uppercase fw-semibold mb-1">Description</div>
                <div className="text-muted" style={{ lineHeight: 1.7 }}>{request.description}</div>
              </div>
            </div>

            {/* Property */}
            <div className="card border-0 bg-light rounded-3 mb-3">
              <div className="card-body p-3">
                <div className="text-muted small text-uppercase fw-semibold mb-1">Property Location</div>
                <div className="fw-semibold">
                  <i className="bi bi-geo-alt text-danger me-1" />{request.location}
                </div>
              </div>
            </div>

            {/* Landlord */}
            <div className="card border-0 bg-light rounded-3 mb-3">
              <div className="card-header bg-transparent border-bottom fw-semibold small py-2 px-3">
                <i className="bi bi-person-badge me-1" />Landlord
              </div>
              <div className="card-body p-3 d-flex align-items-center gap-3">
                <img
                  src={request.landlord.photo}
                  alt={request.landlord.name}
                  className="rounded-circle border"
                  width={48} height={48}
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <div className="fw-semibold">{request.landlord.name}</div>
                  <div className="text-muted small">
                    <i className="bi bi-envelope me-1" />{request.landlord.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Photo */}
            {request.photo && (
              <div className="card border-0 bg-light rounded-3">
                <div className="card-header bg-transparent border-bottom fw-semibold small py-2 px-3">
                  <i className="bi bi-image me-1" />Photo
                </div>
                <div className="card-body p-3">
                  <img
                    src={request.photo}
                    alt={request.subject}
                    className="rounded-3 w-100"
                    style={{ maxHeight: 200, objectFit: "cover" }}
                  />
                </div>
              </div>
            )}

          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
            <button
              className="btn btn-outline-danger"
              onClick={() => { onDecline(request.id); onClose(); }}
            >
              <i className="bi bi-x-circle me-1" />Decline
            </button>
            <button
              className="btn btn-success"
              onClick={() => { onAccept(request.id); onClose(); }}
            >
              <i className="bi bi-check-circle me-1" />Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MaintenanceRequests() {
  const [requests,    setRequests]    = useState(FAKE_REQUESTS);
  const [viewRequest, setViewRequest] = useState(null);
  const [page,        setPage]        = useState(1);

  const handleAccept  = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));
  const handleDecline = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));

  const totalPages = Math.ceil(requests.length / PER_PAGE);
  const paginated  = requests.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Maintenance Requests</h4>
        <p className="text-muted small mb-0">Review and accept or decline assigned requests</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-clipboard-x fs-1 d-block mb-2 opacity-50" />
          <p>No pending requests.</p>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            {paginated.map((r) => {
              const priority = PRIORITY_CONFIG[r.priority] || PRIORITY_CONFIG["Standard"];
              const cardImage = r.photo || `https://placehold.co/400x200/e9ecef/6c757d?text=${encodeURIComponent(r.priority)}`;
              return (
                <div key={r.id} className="col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm h-100">
                    <img
                      src={cardImage}
                      alt={r.subject}
                      className="card-img-top"
                      style={{ height: 180, objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <div className="d-flex gap-1 flex-wrap mb-2">
                        <span className={`badge bg-${priority.badge}`}>
                          <i className={`bi ${priority.icon} me-1`} />{r.priority}
                        </span>
                      </div>
                      <h6 className="fw-bold mb-2 text-truncate">{r.subject}</h6>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <img
                          src={r.landlord.photo}
                          alt={r.landlord.name}
                          className="rounded-circle border flex-shrink-0"
                          width={24} height={24}
                          style={{ objectFit: "cover" }}
                        />
                        <span className="text-muted small text-truncate">{r.landlord.email}</span>
                      </div>
                      <div className="text-muted small">
                        <i className="bi bi-calendar me-1" />{r.date}
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top-0 pb-3 px-3 d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm flex-grow-1"
                        onClick={() => setViewRequest(r)}
                      >
                        <i className="bi bi-eye me-1" />View
                      </button>
                      <button
                        className="btn btn-success btn-sm flex-grow-1"
                        onClick={() => handleAccept(r.id)}
                      >
                        <i className="bi bi-check me-1" />Accept
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm flex-grow-1"
                        onClick={() => handleDecline(r.id)}
                      >
                        <i className="bi bi-x me-1" />Decline
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

      <ViewModal
        request={viewRequest}
        onClose={() => setViewRequest(null)}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
}
