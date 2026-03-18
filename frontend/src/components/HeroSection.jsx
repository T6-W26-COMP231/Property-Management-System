
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div>

      {/* Hero */}
      <div className="bg-dark text-white text-center py-5">
        <div className="container py-4">
          <h1 className="display-4 fw-bold mb-3">Property Management System</h1>
          <p className="lead mb-4">
            Connecting landlords, residents, and contractors in one simple platform.
            Track rent, manage maintenance, and resolve issues — all in one place.
          </p>
          <Link to="/signup" className="btn btn-warning btn-lg me-3">Get Started</Link>
          <Link to="/contact" className="btn btn-outline-light btn-lg">Contact Support</Link>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-light text-center py-5">
        <div className="container">
          <h2 className="fw-bold mb-3">Our Mission</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            We make property management simple and transparent. Landlords stay in control,
            residents feel heard, and contractors know exactly what to do.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-5">Features</h2>
        <div className="row g-4">

          <div className="col-md-3">
            <div className="card h-100 text-center p-3">
              <div className="fs-1 mb-3">💰</div>
              <h5 className="fw-bold">Rent Tracking</h5>
              <p className="text-muted">Landlords monitor rent payments and flag overdue accounts in real time.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 text-center p-3">
              <div className="fs-1 mb-3">🔧</div>
              <h5 className="fw-bold">Maintenance Requests</h5>
              <p className="text-muted">Residents submit issues easily. Landlords review and manage every request.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 text-center p-3">
              <div className="fs-1 mb-3">👷</div>
              <h5 className="fw-bold">Contractor Assignment</h5>
              <p className="text-muted">Assign maintenance jobs to contractors and track progress until resolved.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 text-center p-3">
              <div className="fs-1 mb-3">💬</div>
              <h5 className="fw-bold">Messaging</h5>
              <p className="text-muted">Landlords, residents, and contractors stay connected through built-in messaging.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HeroSection;
