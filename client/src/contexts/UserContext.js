import { useState, useContext, createContext, useEffect, useMemo } from "react";
import { axiosApiInstance } from "../utils/axiosConfig";
import { useAuthContext } from "./AuthContext";
import { Auth } from 'aws-amplify';

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
      const data = await Auth.currentAuthenticatedUser();
      console.log("IN AUTH USER:", data);
      if(data) {
        // temporary. We should fetch user data through /api/user
        setUser({
          id: data.username,
          username: data.username,
        });
         setAuth(true);
      }
      const res = await axiosApiInstance.get("/auth/api/user");
      if (res.data.user) {
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
    authenticateUser();
  }, []);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}
