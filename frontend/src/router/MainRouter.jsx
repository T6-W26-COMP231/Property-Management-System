// frontend/src/router/MainRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import MessagesLayoutPage from '../pages/MessageLayout';
import PropertyDashboard from '../pages/PropertyDashboard';

const MainRouter = () => {

  const { dbUser } = useUser();

  const isLandlord = dbUser?.role === "landlord";

  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landlord/dashboard" element={<PropertyDashboard />} />
          <Route path='landlord/messages' element={<MessagesLayoutPage />} />
        </Routes>
      </div>
      
  

    
  );
};

export default MainRouter;