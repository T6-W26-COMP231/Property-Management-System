import { useState } from "react";

// ── Fake data — all completed ─────────────────────────────────────────────────
const COMPLETED_REQUESTS = [
  {
    id: 1,
    subject:     "Heater not working",
    description: "The heater in unit 3B was repaired and restored to full function.",
    priority:    "emergency",
    property:    "Maple Residences",
    unit:        "3B",
    residentName:"Alice Johnson",
    residentImg: "https://placehold.co/40x40/FF6B6B/ffffff?text=AJ",
    residentId:  "RES-001",
    completedDate: "2026-03-12",
    img:         "https://placehold.co/400x180/E74C3C/ffffff?text=Heater+Issue",
  },
  {
    id: 2,
    subject:     "Parking lot light out",
    description: "Two parking lot lights were replaced and tested successfully.",
    priority:    "standard",
    property:    "Pine Valley Flats",
    unit:        "Parking",
    residentName:"Frank Lee",
    residentImg: "https://placehold.co/40x40/54A0FF/ffffff?text=FL",
    residentId:  "RES-006",
    completedDate: "2026-03-10",
    img:         "https://placehold.co/400x180/F39C12/ffffff?text=Parking+Light",
  },
  {
    id: 3,
    subject:     "Broken door hinge",
    description: "Front door hinge on unit 2A was replaced and door realigned.",
    priority:    "standard",
    property:    "Oak Park Condos",
    unit:        "2A",
    residentName:"Sarah Brown",
    residentImg: "https://placehold.co/40x40/1DD1A1/ffffff?text=SB",
    residentId:  "RES-009",
    completedDate: "2026-03-08",
    img:         "https://placehold.co/400x180/27AE60/ffffff?text=Door+Hinge",
  },
  {
    id: 4,
    subject:     "Clogged drain",
    description: "Bathroom drain in unit 6C was cleared and tested.",
    priority:    "urgent",
    property:    "Sunset Apartments",
    unit:        "6C",
    residentName:"Mike Turner",
    residentImg: "https://placehold.co/40x40/FF9F43/ffffff?text=MT",
    residentId:  "RES-010",
    completedDate: "2026-03-06",
    img:         "https://placehold.co/400x180/3498DB/ffffff?text=Clogged+Drain",
  },
  {
    id: 5,
    subject:     "Broken intercom",
    description: "Building intercom system was repaired and all units tested.",
    priority:    "urgent",
    property:    "Cedar Grove Suites",
    unit:        "Common",
    residentName:"Nina Patel",
    residentImg: "https://placehold.co/40x40/5F27CD/ffffff?text=NP",
    residentId:  "RES-011",
    completedDate: "2026-03-04",
    img:         "https://placehold.co/400x180/8E44AD/ffffff?text=Intercom",
  },
  {
    id: 6,
    subject:     "Roof leak repair",
    description: "Roof leak above unit 8D was patched and waterproofed.",
    priority:    "emergency",
    property:    "Willow Creek Manor",
    unit:        "8D",
    residentName:"Tom Garcia",
    residentImg: "https://placehold.co/40x40/00D2D3/ffffff?text=TG",
    residentId:  "RES-012",
    completedDate: "2026-03-02",
    img:         "https://placehold.co/400x180/C0392B/ffffff?text=Roof+Leak",
  },
];

const PRIORITY_CONFIG = {
  standard:  { label: "Standard",  badge: "info",    icon: "bi-flag"                       },
  urgent:    { label: "Urgent",    badge: "warning", icon: "bi-flag-fill"                  },
  emergency: { label: "Emergency", badge: "danger",  icon: "bi-exclamation-triangle-fill"  },
};

const PER_PAGE = 6;

export default function CompletedRequests() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(COMPLETED_REQUESTS.length / PER_PAGE);
  const paginated  = COMPLETED_REQUESTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Completed Requests</h4>
          <p className="text-muted mb-0 small">All resolved maintenance requests</p>
        </div>
      </div>

      {/* Count banner */}
      <div className="card border-0 shadow-sm bg-success text-white mb-4">
        <div className="card-body d-flex align-items-center gap-3 p-4">
          <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center"
               style={{ width: 56, height: 56 }}>
            <i className="bi bi-check-circle-fill fs-3" />
          </div>
          <div>
            <div className="fs-2 fw-bold">{COMPLETED_REQUESTS.length}</div>
            <div className="opacity-75">Total Completed Requests</div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="row g-4 mb-4">
        {paginated.map((r) => {
          const priority = PRIORITY_CONFIG[r.priority];
          return (
            <div key={r.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">

                {/* Photo */}
                <img
                  src={r.img}
                  alt={r.subject}
                  className="card-img-top"
                  style={{ height: 160, objectFit: "cover" }}
                />

                <div className="card-body">

                  {/* Status + Priority */}
                  <div className="d-flex gap-2 mb-2">
                    <span className="badge bg-success">
                      <i className="bi bi-check-circle me-1" />Completed
                    </span>
                    <span className={`badge bg-${priority.badge}`}>
                      <i className={`bi ${priority.icon} me-1`} />{priority.label}
                    </span>
                  </div>

                  {/* Subject */}
                  <h6 className="fw-bold mb-1">{r.subject}</h6>
                  <p className="text-muted small mb-3" style={{ fontSize: 12 }}>
                    {r.description.length > 80
                      ? r.description.substring(0, 80) + "..."
                      : r.description}
                  </p>

                  {/* Property info */}
                  <div className="small text-muted mb-3">
                    <div><i className="bi bi-building me-1" />{r.property}</div>
                    <div><i className="bi bi-door-closed me-1" />Unit {r.unit}</div>
                    <div>
                      <i className="bi bi-calendar-check me-1 text-success" />
                      Completed: {r.completedDate}
                    </div>
                  </div>

                  {/* Resident info */}
                  <div className="d-flex align-items-center gap-2 p-2 bg-light rounded-3">
                    <img
                      src={r.residentImg}
                      alt={r.residentName}
                      className="rounded-circle"
                      width={36}
                      height={36}
                    />
                    <div>
                      <div className="fw-semibold" style={{ fontSize: 12 }}>{r.residentName}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>
                        <i className="bi bi-person-badge me-1" />{r.residentId}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="card-footer bg-transparent border-top-0 pb-3 px-3">
                  <button className="btn btn-outline-success btn-sm w-100">
                    <i className="bi bi-eye me-1" />View Details
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
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

    </div>
  );
}
