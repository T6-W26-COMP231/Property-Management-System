// frontend/src/router/MainRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import MessagesLayoutPage from '../pages/MessageLayout';
import ProfilePage       from "../pages/ProfilePage";
import LandlordDashboard from "../pages/Landlord/LandlordDashboard";
import ResidentDashboard from "../pages/resident/ResidentDashboard";
import ContractorDashboard from "../pages/Contractor/ContractorDashboard";
const MainRouter = () => {

  const { dbUser } = useUser();

  const isLandlord = dbUser?.role === "landlord";
  const isResident = dbUser?.role === "resident";
  const isContractor = dbUser?.role === "contractor";

  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />          
          <Route path="/messages" element={<MessagesLayoutPage />} />
          <Route path="/profile"   element={<ProfilePage />} />
          <Route
        path="/landlord/*"
        element={isLandlord ? <LandlordDashboard /> : <Navigate to="/" replace />}
      />
       <Route
        path="/resident/*"
        element={isResident ? <ResidentDashboard /> : <Navigate to="/" replace />}
              />
        <Route
        path="/contractor/*"
        element={isContractor ? <ContractorDashboard /> : <Navigate to="/" replace />}
      />
        </Routes>
      </div>
      
  

    
  );
};

export default MainRouter;