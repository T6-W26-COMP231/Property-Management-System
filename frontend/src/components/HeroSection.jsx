import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  // --- DATA ARRAYS (to keep code clean and easily updatable) ---
  const features = [
    { icon: "bi-cash-coin", title: "Track Rent Seamlessly", desc: "Easily track rent payment status across multiple tenants in real time, completely eliminating the need for messy spreadsheets." },
    { icon: "bi-tools", title: "Prioritize Maintenance", desc: "Stop disorganized text complaints. Tenants submit tickets so you can prioritize urgent vs. non-urgent issues and quickly dispatch contractors." },
    { icon: "bi-folder-check", title: "Centralize Contracts", desc: "No more scattered physical files or lost emails. Store lease contracts securely in the cloud and never miss a renewal date again." }
  ];

  const roles = [
    { target: "For Landlords", icon: "bi-building", benefits: ["Manage 1-10 Properties", "Save 5-10 Hours Weekly", "One-Click Contractor Contact"] },
    { target: "For Residents", icon: "bi-house-door", benefits: ["Simple Rent Tracking", "Easy Issue Reporting", "Direct Landlord Messaging"] },
    { target: "For Contractors", icon: "bi-wrench-adjustable", benefits: ["Clear Issue Descriptions", "Direct Communication", "Streamlined Workflow"] }
  ];

  const docs = [
    { title: "Getting Started", desc: "Set up your first property and invite tenants.", icon: "bi-rocket" },
    { title: "Managing Leases", desc: "How to upload and track contract dates.", icon: "bi-file-earmark-pdf" },
    { title: "Maintenance Flow", desc: "Routing tenant complaints to contractors.", icon: "bi-clipboard-check" },
    { title: "Payment Tracking", desc: "Monitoring rent status across your portfolio.", icon: "bi-bank" }
  ];

  return (
    <div className="bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="py-5" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container py-5">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 pe-lg-5">
              <div className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3 fw-semibold">
                Purpose-Built for 1-10 Properties
              </div>
              <h1 className="display-4 fw-bold mb-4">
                The Smart Property Manager for <span className="text-gradient">Solo Landlords</span>
              </h1>
              <p className="lead text-secondary mb-4 pe-md-5">
                Stop juggling disorganized texts, scattered lease files, and messy spreadsheets. Streamline your property management without the expensive enterprise price tag.
              </p>
              <div className="d-flex gap-3 flex-column flex-sm-row">
                <Link to="/signup" className="btn btn-primary btn-lg fw-semibold px-4 py-3 shadow-sm">
                  Get Started Free
                </Link>
                <Link to="/contact" className="btn btn-outline-secondary btn-lg fw-semibold px-4 py-3">
                  View Demo
                </Link>
              </div>
            </div>
            
            {/* Mock Dashboard Preview */}
            <div className="col-lg-6">
              <div className="mock-dashboard p-1">
                <div className="bg-light rounded-top px-3 py-2 border-bottom d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-danger" style={{width: '10px', height: '10px'}}></div>
                  <div className="rounded-circle bg-warning" style={{width: '10px', height: '10px'}}></div>
                  <div className="rounded-circle bg-success" style={{width: '10px', height: '10px'}}></div>
                </div>
                <div className="p-4 bg-white" style={{ minHeight: '300px' }}>
                  <div className="d-flex justify-content-between mb-4">
                    <div className="w-50 bg-light rounded p-3 border"><small className="text-muted fw-bold">Active Properties</small><h3 className="mb-0 mt-2">6 / 10</h3></div>
                    <div className="w-50 bg-light rounded p-3 border ms-3"><small className="text-muted fw-bold">Urgent Issues</small><h3 className="mb-0 mt-2 text-danger">1</h3></div>
                  </div>
                  <div className="w-100 bg-light rounded" style={{ height: '20px', marginBottom: '10px' }}></div>
                  <div className="w-75 bg-light rounded" style={{ height: '20px', marginBottom: '10px' }}></div>
                  <div className="w-100 bg-light rounded" style={{ height: '20px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUCCESS METRICS */}
      <section className="py-4 border-top border-bottom bg-light bg-opacity-50">
        <div className="container text-center">
          <p className="text-muted fw-semibold small mb-3 text-uppercase tracking-wide">Delivering Real Results for Landlords</p>
          <div className="row justify-content-center g-4 opacity-75">
            <div className="col-6 col-md-3">
              <h4 className="mb-0 fw-bold text-primary">4+ Hours</h4>
              <small className="fw-bold">Saved Weekly</small>
            </div>
            <div className="col-6 col-md-3">
              <h4 className="mb-0 fw-bold text-primary">$100+</h4>
              <small className="fw-bold">Saved Monthly</small>
            </div>
            <div className="col-6 col-md-3">
              <h4 className="mb-0 fw-bold text-primary">15%+</h4>
              <small className="fw-bold">Higher Retention</small>
            </div>
            <div className="col-6 col-md-3">
              <h4 className="mb-0 fw-bold text-primary">90%</h4>
              <small className="fw-bold">Fewer Missed Leases</small>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-5 my-5 container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">From Onboarding to Automation</h2>
          <p className="text-muted">Three simple steps to reduce administrative overhead.</p>
        </div>
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>1</div>
            <h5 className="fw-bold">Add Properties</h5>
            <p className="text-muted small px-3">Upload your units and attach existing lease documents to get organized.</p>
          </div>
          <div className="col-md-4">
            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>2</div>
            <h5 className="fw-bold">Invite Residents</h5>
            <p className="text-muted small px-3">Tenants receive a secure link to create their portal and view rent status.</p>
          </div>
          <div className="col-md-4">
            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>3</div>
            <h5 className="fw-bold">Track & Resolve</h5>
            <p className="text-muted small px-3">Monitor incoming rent and instantly route complaints to your contractors.</p>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <h2 className="fw-bold text-center mb-5">Everything You Need. Nothing You Don't.</h2>
          <div className="row g-4">
            {features.map((feat, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 border-0 shadow-sm p-4 hover-lift rounded-4">
                  <i className={`bi ${feat.icon} text-primary mb-3`} style={{ fontSize: '2rem' }}></i>
                  <h5 className="fw-bold">{feat.title}</h5>
                  <p className="text-muted mb-0">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROLE-BASED VALUE */}
      <section className="py-5 container my-5">
        <h2 className="fw-bold text-center mb-5">One Platform. Three Experiences.</h2>
        <div className="row g-4">
          {roles.map((role, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="border rounded-4 p-4 h-100 bg-white shadow-sm">
                <h6 className="text-primary fw-bold text-uppercase mb-3"><i className={`bi ${role.icon} me-2`}></i>{role.target}</h6>
                <ul className="list-unstyled mb-0">
                  {role.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="mb-2 text-secondary">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>{benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DOCUMENTATION SECTION */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">User Documentation</h2>
              <p className="text-dark opacity-75 mb-0">Learn how to maximize your Property Management dashboard.</p>
            </div>
            <Link to="/docs" className="btn btn-outline-dark d-none d-md-block">View Help Center</Link>
          </div>
          
          <div className="row g-3">
            {docs.map((doc, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <Link to={`/docs/${idx}`} className="text-decoration-none">
                  <div className="card bg-white bg-opacity-10 border-1 text-black h-100 p-3 hover-lift">
                    <i className={`bi ${doc.icon} mb-2 fs-4 text-info`}></i>
                    <h6 className="fw-bold">{doc.title}</h6>
                    <small className="opacity-75">{doc.desc}</small>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white py-5 border-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 pe-lg-5">
              <h5 className="fw-bold mb-3">Property Management Platform</h5>
              <p className="text-muted small">A web-based application designed by Team 6 for small-scale landlords to efficiently manage tenant complaints, track rent, and organize contracts.</p>
            </div>
            <div className="col-6 col-lg-2 offset-lg-2">
              <h6 className="fw-bold mb-3">Product</h6>
              <ul className="list-unstyled text-muted small">
                <li className="mb-2"><Link to="/features" className="text-decoration-none text-muted">Features</Link></li>
                <li className="mb-2"><Link to="/pricing" className="text-decoration-none text-muted">Pricing</Link></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">Resources</h6>
              <ul className="list-unstyled text-muted small">
                <li className="mb-2"><Link to="/docs" className="text-decoration-none text-muted">Documentation</Link></li>
                <li className="mb-2"><Link to="/contact" className="text-decoration-none text-muted">Support</Link></li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h6 className="fw-bold mb-3">Team 6</h6>
              <div className="d-flex gap-3">
                <a href="#" className="text-muted fs-5"><i className="bi bi-github"></i></a>
                <a href="#" className="text-muted fs-5"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="border-top mt-5 pt-4 text-center text-muted small">
            &copy; 2026 Property Management System Team 6. All rights reserved.
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default Home;