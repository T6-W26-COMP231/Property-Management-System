// frontend/src/router/MainRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import MessagesLayoutPage from "../pages/MessageLayout";
import ProfilePage from "../pages/ProfilePage";
import LandlordDashboard from "../pages/Landlord/LandlordDashboard";
import ResidentDashboard from "../pages/resident/ResidentDashboard";
import ContractorDashboard from "../pages/contractor/ContractorDashboard";
import OnboardingPage from "../pages/OnboardingPage";

const MainRouter = () => {
  const { isLoading: auth0Loading, isAuthenticated } = useAuth0();
  const { dbUser, isDbLoading } = useUser();

  const isLandlord = dbUser?.role === "landlord";
  const isResident = dbUser?.role === "resident";
  const isContractor = dbUser?.role === "contractor";

  // logic that does not render routes until auth0 and db are synced
  if (auth0Loading || isDbLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated && dbUser && !dbUser.role) {
      return <OnboardingPage />;
    }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && dbUser?.role ? (
              // if logged in, redirect to their dashboard
              <Navigate to={`/${dbUser.role.toLowerCase()}`} replace />
            ) : (
              // if not logged in, show home page
              <Home />
            )
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/messages" element={<MessagesLayoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/landlord/*"
          element={
            isLandlord ? <LandlordDashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/resident/*"
          element={
            isResident ? <ResidentDashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/contractor/*"
          element={
            isContractor ? <ContractorDashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default MainRouter;
