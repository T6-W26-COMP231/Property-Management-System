// ── Fake data — pretend fetched from API ──────────────────────────────────────
const FAKE_REQUESTS = [
  {
    id: 1,
    subject:     "Heater not working",
    description: "The heater in the bedroom stopped working. No heat since Monday morning.",
    priority:    "Emergency",
    status:      "In Progress",
    submittedAt: "2026-03-10",
    photo:       "https://placehold.co/400x200/E74C3C/ffffff?text=Heater+Issue",
  },
  {
    id: 2,
    subject:     "Leaking faucet",
    description: "Kitchen faucet has been dripping for two weeks. Water pooling under the sink.",
    priority:    "Urgent",
    status:      "Submitted",
    submittedAt: "2026-03-14",
    photo:       "https://placehold.co/400x200/3498DB/ffffff?text=Leaking+Faucet",
  },
  {
    id: 3,
    subject:     "Broken window lock",
    description: "The bedroom window lock is broken and cannot be secured properly.",
    priority:    "Standard",
    status:      "Completed",
    submittedAt: "2026-03-01",
    photo:       "https://placehold.co/400x200/95A5A6/ffffff?text=Window+Lock",
  },
  {
    id: 4,
    subject:     "Mold in bathroom ceiling",
    description: "Black mold spotted near the bathroom vent. Growing over the past month.",
    priority:    "Urgent",
    status:      "Submitted",
    submittedAt: "2026-03-16",
    photo:       "https://placehold.co/400x200/27AE60/ffffff?text=Mold+Issue",
  },
  {
    id: 5,
    subject:     "Parking spot light out",
    description: "The light above my parking spot has been out for a week.",
    priority:    "Standard",
    status:      "Completed",
    submittedAt: "2026-02-28",
    photo:       "https://placehold.co/400x200/F39C12/ffffff?text=Parking+Light",
  },
];

const STATUS_CONFIG = {
  "Submitted":   { badge: "secondary", icon: "bi-clock"        },
  "In Progress": { badge: "warning",   icon: "bi-arrow-repeat" },
  "Completed":   { badge: "success",   icon: "bi-check-circle" },
};

const PRIORITY_CONFIG = {
  "Standard":  { badge: "info",    icon: "bi-flag"                      },
  "Urgent":    { badge: "warning", icon: "bi-flag-fill"                  },
  "Emergency": { badge: "danger",  icon: "bi-exclamation-triangle-fill"  },
};

export default function MaintenanceStatus() {
  const submitted   = FAKE_REQUESTS.filter((r) => r.status === "Submitted").length;
  const inProgress  = FAKE_REQUESTS.filter((r) => r.status === "In Progress").length;
  const completed   = FAKE_REQUESTS.filter((r) => r.status === "Completed").length;

  return (
    <div className="p-4">

      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Maintenance Status</h4>
        <p className="text-muted small">Track the status of your maintenance requests</p>
      </div>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        <div className="col-4">
          <div className="card border-0 shadow-sm text-center p-3">
            <div className="fs-3 fw-bold text-secondary">{submitted}</div>
            <div className="text-muted small">
              <i className="bi bi-clock me-1" />Submitted
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-0 shadow-sm text-center p-3">
            <div className="fs-3 fw-bold text-warning">{inProgress}</div>
            <div className="text-muted small">
              <i className="bi bi-arrow-repeat me-1" />In Progress
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-0 shadow-sm text-center p-3">
            <div className="fs-3 fw-bold text-success">{completed}</div>
            <div className="text-muted small">
              <i className="bi bi-check-circle me-1" />Completed
            </div>
          </div>
        </div>
      </div>

      {/* Request cards */}
      <div className="row g-4">
        {FAKE_REQUESTS.map((r) => {
          const status   = STATUS_CONFIG[r.status];
          const priority = PRIORITY_CONFIG[r.priority];
          return (
            <div key={r.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">

                {/* Photo */}
                <img
                  src={r.photo}
                  alt={r.subject}
                  className="card-img-top"
                  style={{ height: 160, objectFit: "cover" }}
                />

                <div className="card-body">
                  {/* Status + Priority */}
                  <div className="d-flex gap-2 mb-2 flex-wrap">
                    <span className={`badge bg-${status.badge}`}>
                      <i className={`bi ${status.icon} me-1`} />{r.status}
                    </span>
                    <span className={`badge bg-${priority.badge}`}>
                      <i className={`bi ${priority.icon} me-1`} />{r.priority}
                    </span>
                  </div>

                  {/* Subject */}
                  <h6 className="fw-bold mb-1">{r.subject}</h6>

                  {/* Description */}
                  <p className="text-muted mb-3" style={{ fontSize: 12 }}>
                    {r.description.length > 80
                      ? r.description.substring(0, 80) + "..."
                      : r.description}
                  </p>

                  {/* Date */}
                  <div className="text-muted small">
                    <i className="bi bi-calendar me-1" />Submitted: {r.submittedAt}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="card-footer bg-transparent border-top pt-2 pb-3 px-3">
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Progress</span>
                    <span className={`text-${status.badge}`}>{r.status}</span>
                  </div>
                  <div className="progress" style={{ height: 6 }}>
                    <div
                      className={`progress-bar bg-${status.badge}`}
                      style={{
                        width: r.status === "Submitted"   ? "25%"
                             : r.status === "In Progress" ? "60%"
                             : "100%"
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
