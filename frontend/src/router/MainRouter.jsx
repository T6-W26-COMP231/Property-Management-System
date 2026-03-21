// frontend/src/router/MainRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import MessagesLayoutPage from '../pages/MessageLayout';
import LandlordDashboard from "../pages/Landlord/LandlordDashboard";
import Profile from "../pages/ProfilePage";
const MainRouter = () => {

  const { dbUser } = useUser();

  const isLandlord = dbUser?.role === "landlord";

  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile"    element={<Profile />} />
        
           <Route
        path="/landlord/*"
        element={isLandlord ? <LandlordDashboard /> : <Navigate to="/" replace />}
      />
        </Routes>
      </div>
      
  

    
  );
};

export default MainRouter;