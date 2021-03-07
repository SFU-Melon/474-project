import { useState, useContext, createContext, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

const UserContext = createContext(null);

//custom Hook()
export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  const { setAuth } = useAuthContext();

  const authenticateUser = async () => {
    try {
      const res = await axios.get("/api/user");
      if (res.data.success) {
        setUser(res.data.user);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("useEffect in userContext");
    authenticateUser();
  }, []);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}
