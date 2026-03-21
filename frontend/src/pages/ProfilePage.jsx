import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../context/UserContext";

const ROLE_INFO = {
  resident:   { badge: "success",  icon: "bi-house-heart", canChat: "Landlords" },
  landlord:   { badge: "primary",  icon: "bi-key",         canChat: "Residents & Contractors" },
  contractor: { badge: "warning",  icon: "bi-tools",       canChat: "Landlords" },
};

export default function ProfilePage() {
  const { logout }  = useAuth0();
  const { dbUser }  = useUser();
  const roleInfo    = ROLE_INFO[dbUser.role];

  return (
    <div className="container py-4" style={{ maxWidth: 640 }}>

      <div className="mb-4">
        <h3 className="fw-bold">Your Profile</h3>
        <p className="text-muted">Manage your account information</p>
      </div>

      {/* Profile card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex align-items-center gap-4 p-4">
          {dbUser.picture
            ? <img src={dbUser.picture} alt={dbUser.name} className="rounded-circle" width={72} height={72} />
            : <div className="avatar-circle bg-primary" style={{width:72,height:72,fontSize:28}}>
                {dbUser.name[0]?.toUpperCase()}
              </div>
          }
          <div>
            <h5 className="fw-bold mb-1">{dbUser.name}</h5>
            <p className="text-muted mb-2">{dbUser.email}</p>
            <span className={`badge bg-${roleInfo.badge} fs-6 py-2 px-3`}>
              <i className={`bi ${roleInfo.icon} me-1`} />
              {dbUser.role.charAt(0).toUpperCase() + dbUser.role.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-0">
          <table className="table table-borderless mb-0">
            <tbody>
              <tr className="border-bottom">
                <td className="text-muted ps-4 py-3" style={{width:"40%"}}>Full Name</td>
                <td className="fw-semibold py-3">{dbUser.name}</td>
              </tr>
              <tr className="border-bottom">
                <td className="text-muted ps-4 py-3">Email</td>
                <td className="fw-semibold py-3">{dbUser.email}</td>
              </tr>
              <tr className="border-bottom">
                <td className="text-muted ps-4 py-3">Role</td>
                <td className="py-3">
                  <span className={`badge bg-${roleInfo.badge}`}>
                    {dbUser.role.charAt(0).toUpperCase() + dbUser.role.slice(1)}
                  </span>
                </td>
              </tr>
              <tr className="border-bottom">
                <td className="text-muted ps-4 py-3">Can Message</td>
                <td className="fw-semibold py-3">{roleInfo.canChat}</td>
              </tr>
              <tr>
                <td className="text-muted ps-4 py-3">Member Since</td>
                <td className="fw-semibold py-3">
                  {new Date(dbUser.createdAt).toLocaleDateString([], { year: "numeric", month: "long", day: "numeric" })}
                </td>
              </tr>
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

    </div>
  );
}
