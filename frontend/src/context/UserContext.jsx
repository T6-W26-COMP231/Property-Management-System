import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Create the context
const UserContext = createContext(null);

// Provider — wraps the app and holds dbUser state
export function UserProvider({ children }) {
  const [dbUser, setDbUser] = useState(null);
  const { user, isAuthenticated, isLoading: auth0Loading, getAccessTokenSilently } = useAuth0();
  const [isDbLoading, setIsDbLoading] = useState(true);
  
  // ── Load DB User on Auth0 login ───────────────────────────────────────────── 
  useEffect(() => {
    const syncWithDb = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const res   = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/sync`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({ include: true }),
          });

          const data = await res.json();
          setDbUser(data); // data must include role 

        } catch (error) {
          console.error("Error syncing with DB:", error);
        } finally {
          setIsDbLoading(false); // only stops loading once db responds 
        }
      } else if (!auth0Loading) {
        setDbUser(null); // not authenticated, ensure dbUser is null
        setIsDbLoading(false);
      }
    };
    syncWithDb();
  }, [isAuthenticated, user, auth0Loading]);

  return (
    <UserContext.Provider value={{ dbUser, setDbUser,isDbLoading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook — any component can call useUser() to get dbUser
export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
