import { useState, useContext, createContext, useEffect, useMemo } from "react";
import axios from "axios";

const UserContext = createContext(null);

//custom Hook()
export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  const authenticateUser = async () => {
    try {
      const res = await axios.get("/api/user");
      if (res) {
        setUser(res.data.user);
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
