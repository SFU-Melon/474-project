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
      const authData = await Auth.currentAuthenticatedUser();
      console.log("IN AUTH USER:", authData);
      if(authData) {
        const response = await axiosApiInstance.get(`/user/api/getUserById/${authData.username}`);
        if(response.status === 200) {
          const lambdaData = response.data;
          // temporary. We should fetch user authData through /api/user
          setUser({
            id: authData.username,
            username: authData.username,
            lname: lambdaData.lname,
            fnmae: lambdaData.fname,
            dob: lambdaData.dob, // might need to change to Date object
            email: lambdaData.email,
            joindate: lambdaData.joindate,
            profilephoto: lambdaData.profilephoto,
            following: lambdaData.following,
            followers: lambdaData.followers
          });
           setAuth(true);
        }

      } else {
        setAuth(false);
      }
    } catch (err) {
      console.log(err);
      setAuth(false);
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
