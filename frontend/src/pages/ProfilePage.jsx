import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getProfile, updateProfile, deleteProfilePhoto } from "../services/api";
import Alert             from "../components/Alert";
import Toast             from "../components/Toast";
import ProfileEditModal  from "../components/ProfileEditModal";

const ROLE_BADGE = {
  resident:   "success",
  landlord:   "primary",
  contractor: "warning",
};

const DEFAULT_AVATAR = "https://placehold.co/110x110/cccccc/ffffff?text=No+Photo";

export default function ProfilePage() {
  const { logout, getAccessTokenSilently } = useAuth0();

  const [profile,   setProfile]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [toast,     setToast]     = useState({ show: false, type: "success", message: "" });
  const [error,     setError]     = useState("");

  // ── Load profile ──────────────────────────────────────────────────────────
  const load = async () => {
    try {
      const token = await getAccessTokenSilently();
      const data  = await getProfile(token);
      setProfile(data);
    } catch {
      setToast({ show: true, type: "danger", message: "Failed to load profile." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // ── Save from modal ───────────────────────────────────────────────────────
  const handleSave = async (formData) => {
    setSaving(true);
    setError("");
    try {
      const token   = await getAccessTokenSilently();
      const updated = await updateProfile(token, formData);
      setProfile(updated);
      setShowModal(false);
      setToast({ show: true, type: "success", message: "Profile updated successfully!" });
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Remove photo ──────────────────────────────────────────────────────────
  const handleRemovePhoto = async () => {
    if (!window.confirm("Remove your profile photo?")) return;
    try {
      const token   = await getAccessTokenSilently();
      const updated = await deleteProfilePhoto(token);
      setProfile(updated);
      setToast({ show: true, type: "success", message: "Photo removed." });
    } catch {
      setToast({ show: true, type: "danger", message: "Failed to remove photo." });
    }
  };

  const fullName = profile
    ? [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "—"
    : "—";

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 700 }}>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">My Profile</h3>
          <p className="text-muted small mb-0">Manage your personal information</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          <i className="bi bi-pencil me-1" />Edit Profile
        </button>
      </div>

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />

      {/* Profile card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-4 flex-wrap">
            {/* Photo */}
            <div className="position-relative flex-shrink-0">
              <img
                src={profile?.photo?.url || DEFAULT_AVATAR}
                alt={fullName}
                className="rounded-circle border shadow-sm"
                style={{ width: 110, height: 110, objectFit: "cover" }}
              />
              {profile?.role && (
                <span
                  className={`badge bg-${ROLE_BADGE[profile.role] || "secondary"} position-absolute bottom-0 end-0`}
                  style={{ fontSize: 10 }}
                >
                  {profile.role}
                </span>
              )}
            </div>
            {/* Name + email */}
            <div>
              <h4 className="fw-bold mb-1">{fullName}</h4>
              <p className="text-muted mb-0">
                <i className="bi bi-envelope me-1" />
                {profile?.email || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details table */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-transparent border-bottom fw-semibold py-3 px-4">
          Personal Information
        </div>
        <div className="card-body p-0">
          <table className="table table-borderless mb-0">
            <tbody>
              {[
                { label: "First Name",     icon: "bi-person",    value: profile?.firstName     },
                { label: "Last Name",      icon: "bi-person",    value: profile?.lastName      },
                { label: "Email",          icon: "bi-envelope",  value: profile?.email         },
                { label: "Contact Number", icon: "bi-telephone", value: profile?.contactNumber },
                { label: "Address",        icon: "bi-house",     value: profile?.address       },
                { label: "City",           icon: "bi-geo",       value: profile?.city          },
                { label: "State",          icon: "bi-map",       value: profile?.state         },
              ].map(({ label, icon, value }) => (
                <tr key={label} className="border-bottom">
                  <td className="text-muted ps-4 py-3" style={{ width: "35%" }}>
                    <i className={`bi ${icon} me-2`} />{label}
                  </td>
                  <td className={`py-3 fw-semibold ${!value ? "text-muted fst-italic" : ""}`}>
                    {value || "Not set"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sign out */}
      <button
        className="btn btn-outline-danger w-100"
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      >
        <i className="bi bi-box-arrow-right me-2" />Sign Out
      </button>

      {/* Edit modal — extracted into reusable component */}
      <ProfileEditModal
        show={showModal}
        profile={profile}
        saving={saving}
        error={error}
        onSave={handleSave}
        onClose={() => { setShowModal(false); setError(""); }}
        onRemovePhoto={handleRemovePhoto}
      />

    </div>
  );
}
