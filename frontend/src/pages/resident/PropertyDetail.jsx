// ── Fake data — pretend fetched from API ──────────────────────────────────────
const FAKE_PROPERTY = {
  name:        "Maple Residences",
  location:    "123 Maple St, Unit 3B, Toronto, ON M5V 2T6",
  description: "A modern and well-maintained apartment in the heart of Toronto. Features include in-suite laundry, hardwood floors, stainless steel appliances, and access to a rooftop terrace. Located steps from public transit and local shops.",
  landlordId:  "auth0|landlord_abc123",
  unit:        "3B",
  leaseStart:  "2025-09-01",
  leaseEnd:    "2026-08-31",
  rent:        "$1,850 / month",
  image:       "https://placehold.co/800x400/4A90D9/ffffff?text=Maple+Residences",
  leaseDoc:    "#", // in real app this would be a Cloudinary PDF URL
};

export default function PropertyDetail() {
  const p = FAKE_PROPERTY;

  return (
    <div className="p-4" style={{ maxWidth: 860 }}>

      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">My Property</h4>
        <p className="text-muted small">Your current rental property details</p>
      </div>

      {/* Property photo */}
      <div className="card border-0 shadow-sm mb-4 overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="w-100"
          style={{ height: 280, objectFit: "cover" }}
        />
      </div>

      {/* Property info */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold mb-0">{p.name}</h5>
            <span className="badge bg-success fs-6 px-3 py-2">Active Lease</span>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="text-muted small text-uppercase fw-semibold mb-1">Location</div>
              <div className="fw-semibold">
                <i className="bi bi-geo-alt text-danger me-1" />{p.location}
              </div>
            </div>

            <div className="col-md-6">
              <div className="text-muted small text-uppercase fw-semibold mb-1">Unit</div>
              <div className="fw-semibold">
                <i className="bi bi-door-closed text-primary me-1" />Unit {p.unit}
              </div>
            </div>

            <div className="col-md-6">
              <div className="text-muted small text-uppercase fw-semibold mb-1">Lease Period</div>
              <div className="fw-semibold">
                <i className="bi bi-calendar-range text-warning me-1" />
                {p.leaseStart} → {p.leaseEnd}
              </div>
            </div>

            <div className="col-md-6">
              <div className="text-muted small text-uppercase fw-semibold mb-1">Monthly Rent</div>
              <div className="fw-semibold">
                <i className="bi bi-currency-dollar text-success me-1" />{p.rent}
              </div>
            </div>

            <div className="col-12">
              <div className="text-muted small text-uppercase fw-semibold mb-1">Landlord ID</div>
              <div className="fw-semibold font-monospace small bg-light px-2 py-1 rounded">
                <i className="bi bi-person-badge text-primary me-1" />{p.landlordId}
              </div>
            </div>

            <div className="col-12">
              <div className="text-muted small text-uppercase fw-semibold mb-1">Description</div>
              <div className="text-muted" style={{ lineHeight: 1.7 }}>{p.description}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lease document */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-3 bg-danger bg-opacity-10 p-3">
              <i className="bi bi-file-earmark-pdf text-danger fs-3" />
            </div>
            <div>
              <div className="fw-bold">Lease Agreement</div>
              <div className="text-muted small">
                lease_agreement_{p.unit}_{p.leaseStart}.pdf
              </div>
            </div>
          </div>
          <a
            href={p.leaseDoc}
            download
            className="btn btn-outline-danger"
          >
            <i className="bi bi-download me-2" />Download PDF
          </a>
        </div>
      </div>

    </div>
  );
}
