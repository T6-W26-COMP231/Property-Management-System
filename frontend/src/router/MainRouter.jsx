// frontend/src/router/MainRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import MessagesLayoutPage from '../pages/MessageLayout';
import PropertyDashboard from '../pages/PropertyDashboard';

const MainRouter = () => {
  const userRole = 'landlord'; 

  return (
    <Router>
      <div className="App">
        <Navbar userRole={userRole} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landlord/dashboard" element={<PropertyDashboard />} />
          <Route path='landlord/messages' element={<MessagesLayoutPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default MainRouter;