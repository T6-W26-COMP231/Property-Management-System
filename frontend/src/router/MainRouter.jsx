// frontend/src/router/MainRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import ContactSupport from '../pages/ContactSupport';

const MainRouter = () => {
  const userRole = 'guest'; 

  return (
    <Router>
      <div className="App">
        <Navbar userRole={userRole} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactSupport />} />
        </Routes>
      </div>
    </Router>
  );
};

export default MainRouter;