import { useState } from "react";

//Dummy Data For Properties - This would normally come from an API
const PROPERTIES = [
  { id: 1,  name: "Maple Residences",     location: "123 Maple St, Toronto, ON",       units: 12, occupied: 10, img: "https://placehold.co/400x220/4A90D9/ffffff?text=Maple+Residences"     },
  { id: 2,  name: "Sunset Apartments",    location: "456 Sunset Blvd, Vancouver, BC",  units: 8,  occupied: 8,  img: "https://placehold.co/400x220/E67E22/ffffff?text=Sunset+Apartments"    },
  { id: 3,  name: "Oak Park Condos",      location: "789 Oak Ave, Calgary, AB",        units: 20, occupied: 17, img: "https://placehold.co/400x220/27AE60/ffffff?text=Oak+Park+Condos"      },
  { id: 4,  name: "Riverside Townhomes",  location: "321 River Rd, Ottawa, ON",        units: 6,  occupied: 5,  img: "https://placehold.co/400x220/8E44AD/ffffff?text=Riverside+Townhomes"  },
  { id: 5,  name: "Cedar Grove Suites",   location: "654 Cedar Ln, Montreal, QC",      units: 15, occupied: 12, img: "https://placehold.co/400x220/C0392B/ffffff?text=Cedar+Grove+Suites"   },
  { id: 6,  name: "Pine Valley Flats",    location: "987 Pine St, Edmonton, AB",       units: 10, occupied: 9,  img: "https://placehold.co/400x220/16A085/ffffff?text=Pine+Valley+Flats"    },
  { id: 7,  name: "Birch Lane Lofts",     location: "111 Birch Way, Winnipeg, MB",     units: 7,  occupied: 6,  img: "https://placehold.co/400x220/2980B9/ffffff?text=Birch+Lane+Lofts"     },
  { id: 8,  name: "Willow Creek Manor",   location: "222 Willow Dr, Halifax, NS",      units: 18, occupied: 15, img: "https://placehold.co/400x220/D35400/ffffff?text=Willow+Creek+Manor"   },
  { id: 9,  name: "Elm Street Residences",location: "333 Elm Blvd, Victoria, BC",      units: 9,  occupied: 9,  img: "https://placehold.co/400x220/1ABC9C/ffffff?text=Elm+Street+Residences"},
  { id: 10, name: "Aspen Heights",        location: "444 Aspen Rd, Saskatoon, SK",     units: 11, occupied: 8,  img: "https://placehold.co/400x220/F39C12/ffffff?text=Aspen+Heights"        },
  { id: 11, name: "Spruce Hill Condos",   location: "555 Spruce Ave, Regina, SK",      units: 14, occupied: 11, img: "https://placehold.co/400x220/7F8C8D/ffffff?text=Spruce+Hill+Condos"   },
  { id: 12, name: "Chestnut Grove",       location: "666 Chestnut St, London, ON",     units: 16, occupied: 14, img: "https://placehold.co/400x220/6C3483/ffffff?text=Chestnut+Grove"       },
];

const PER_PAGE = 6;

export default function PropertyDashboard() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(PROPERTIES.length / PER_PAGE);
  const paginated  = PROPERTIES.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">My Properties</h4>
          <p className="text-muted mb-0 small">{PROPERTIES.length} properties total</p>
        </div>
        <button className="btn btn-primary btn-sm">
          <i className="bi bi-plus-lg me-1" />Add Property
        </button>
      </div>

      {/* Summary stats */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm text-center p-3">
            <div className="fs-3 fw-bold text-primary">{PROPERTIES.length}</div>
            <div className="text-muted small">Total Properties</div>
          </div>
        </div>
      </div>

      {/* Property cards */}
      <div className="row g-4 mb-4">
        {paginated.map((p) => (
            <div key={p.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">

                {/* Property photo */}
                <img
                  src={p.img}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: 180, objectFit: "cover" }}
                />

                <div className="card-body">
                  {/* Name + location */}
                  <h6 className="fw-bold mb-1">{p.name}</h6>
                  <p className="text-muted small mb-3">
                    <i className="bi bi-geo-alt me-1" />{p.location}
                  </p>
                </div>

                {/* Card footer */}
                <div className="card-footer bg-transparent border-top-0 pt-0 pb-3 px-3">
                  <button className="btn btn-outline-primary btn-sm w-100">
                    <i className="bi bi-eye me-1" />View Details
                  </button>
                </div>

              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
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

    </div>
  );
}
