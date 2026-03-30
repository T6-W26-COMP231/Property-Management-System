import { FAKE_RATINGS } from "./fakeData";

function StarDisplay({ rating }) {
  return (
    <div className="d-flex align-items-center gap-1">
      {Array.from({ length: 10 }, (_, i) => (
        <i
          key={i}
          className={`bi ${i < rating ? "bi-star-fill text-warning" : "bi-star text-muted"}`}
          style={{ fontSize: 12 }}
        />
      ))}
      <span className="fw-bold ms-1 small">{rating}/10</span>
    </div>
  );
}

function RatingBadge({ rating }) {
  const color = rating >= 8 ? "success" : rating >= 5 ? "warning" : "danger";
  return <span className={`badge bg-${color} fs-6 px-3 py-2`}>{rating}/10</span>;
}

export default function Ratings() {
  const ratings = FAKE_RATINGS;
  const average = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 0;

  const avgColor = average >= 8 ? "success" : average >= 5 ? "warning" : "danger";

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Ratings</h4>
        <p className="text-muted small mb-0">Feedback received from landlords</p>
      </div>

      {/* Average rating card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4 d-flex align-items-center gap-4 flex-wrap">
          <div
            className={`rounded-circle bg-${avgColor} d-flex align-items-center justify-content-center flex-shrink-0`}
            style={{ width: 80, height: 80 }}
          >
            <span className="text-white fw-bold fs-4">{average}</span>
          </div>
          <div>
            <div className="fw-bold fs-5 mb-1">Average Rating</div>
            <StarDisplay rating={Math.round(average)} />
            <div className="text-muted small mt-1">
              Based on {ratings.length} review{ratings.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Individual ratings */}
      {ratings.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-star fs-1 d-block mb-2 opacity-50" />
          <p>No ratings yet.</p>
        </div>
      ) : (
        <div className="row g-3">
          {ratings.map((r) => (
            <div key={r.id} className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3 flex-wrap">

                    {/* Landlord photo */}
                    <img
                      src={r.landlord.photo}
                      alt={r.landlord.name}
                      className="rounded-circle border flex-shrink-0"
                      width={52} height={52}
                      style={{ objectFit: "cover" }}
                    />

                    <div className="flex-grow-1">
                      {/* Landlord info */}
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                        <div>
                          <div className="fw-bold">{r.landlord.name}</div>
                          <div className="text-muted small">
                            <i className="bi bi-envelope me-1" />{r.landlord.email}
                          </div>
                        </div>
                        <RatingBadge rating={r.rating} />
                      </div>

                      {/* Stars */}
                      <div className="mb-2">
                        <StarDisplay rating={r.rating} />
                      </div>

                      {/* Comment */}
                      <div
                        className="bg-light rounded-3 p-3 text-muted mb-2"
                        style={{ lineHeight: 1.7, fontSize: 14 }}
                      >
                        <i className="bi bi-chat-quote me-1 text-secondary" />
                        {r.comment}
                      </div>

                      {/* Job + date */}
                      <div className="d-flex gap-3 text-muted small flex-wrap">
                        <span><i className="bi bi-tools me-1" />{r.job}</span>
                        <span><i className="bi bi-calendar me-1" />{r.date}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
