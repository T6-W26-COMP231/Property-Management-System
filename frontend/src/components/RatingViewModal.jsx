// ── Usage ─────────────────────────────────────────────────────────────────────
// <RatingViewModal
//   rating={viewRating}       // single rating object
//   onClose={() => {}}
// />
//
// rating shape:
// {
//   _id, rating, comment, createdAt,
//   landlord: { name, email, photo },
//   contractorId, maintenanceId
// }
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_AVATAR = "https://placehold.co/64x64/cccccc/ffffff?text=?";

function StarDisplay({ rating }) {
  return (
    <div className="d-flex align-items-center gap-1 flex-wrap">
      {Array.from({ length: 10 }, (_, i) => (
        <i
          key={i}
          className={`bi ${i < rating ? "bi-star-fill text-warning" : "bi-star text-muted"}`}
          style={{ fontSize: 16 }}
        />
      ))}
    </div>
  );
}

function RatingBar({ rating }) {
  const pct   = (rating / 10) * 100;
  const color = rating >= 8 ? "success" : rating >= 5 ? "warning" : "danger";
  return (
    <div className="d-flex align-items-center gap-3">
      <div className="progress flex-grow-1" style={{ height: 10 }}>
        <div className={`progress-bar bg-${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`fw-bold text-${color}`}>{rating}/10</span>
    </div>
  );
}

export default function RatingViewModal({ rating = null, onClose = () => {} }) {
  if (!rating) return null;

  const color = rating.rating >= 8 ? "success" : rating.rating >= 5 ? "warning" : "danger";
  const date  = new Date(rating.createdAt).toLocaleDateString([], {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 480 }}>
        <div className="modal-content border-0 shadow">

          {/* Colored top bar */}
          <div style={{ height: 5, background: color === "success" ? "#198754" : color === "warning" ? "#ffc107" : "#dc3545" }} />

          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-star me-2 text-warning" />Rating Detail
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body p-4">

            {/* Landlord info */}
            <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded-3">
              <img
                src={rating.landlord?.photo || DEFAULT_AVATAR}
                alt={rating.landlord?.name}
                className="rounded-circle border flex-shrink-0"
                width={64} height={64}
                style={{ objectFit: "cover" }}
              />
              <div>
                <div className="fw-bold fs-6">{rating.landlord?.name || "—"}</div>
                <div className="text-muted small">
                  <i className="bi bi-envelope me-1" />{rating.landlord?.email || "—"}
                </div>
                <div className="text-muted small">
                  <i className="bi bi-calendar me-1" />{date}
                </div>
              </div>
            </div>

            {/* Rating score */}
            <div className="card border-0 bg-light rounded-3 mb-3">
              <div className="card-body p-3">
                <div className="text-muted small text-uppercase fw-semibold mb-2">Score</div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className={`rounded-circle bg-${color} d-flex align-items-center justify-content-center flex-shrink-0`}
                    style={{ width: 56, height: 56 }}
                  >
                    <span className="text-white fw-bold fs-5">{rating.rating}</span>
                  </div>
                  <div className="flex-grow-1">
                    <StarDisplay rating={rating.rating} />
                    <div className="mt-2">
                      <RatingBar rating={rating.rating} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="card border-0 bg-light rounded-3">
              <div className="card-body p-3">
                <div className="text-muted small text-uppercase fw-semibold mb-2">Comment</div>
                {rating.comment ? (
                  <div className="text-muted" style={{ lineHeight: 1.8, fontSize: 14 }}>
                    <i className="bi bi-chat-quote me-1 text-secondary" />
                    {rating.comment}
                  </div>
                ) : (
                  <div className="text-muted fst-italic small">No comment left</div>
                )}
              </div>
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>

        </div>
      </div>
    </div>
  );
}
