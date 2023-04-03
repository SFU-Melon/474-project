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
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const { setAuth } = useAuthContext();

  const authenticateUser = async () => {
    try {
      const authData = await Auth.currentAuthenticatedUser();
      console.log("IN AUTH USER:", authData);
      if(authData) {
        const [response, followResponse] = await Promise.all([
          axiosApiInstance.get(`/user/api/getUserById/${authData.username}`),
          axiosApiInstance.get(`/user/api/getFollowersAndFollowingUsers/${authData.username}`)
        ]);
        if(response.status === 200 && followResponse.status === 200) {
          const userData = response.data;
          const followData = followResponse.data;
          // temporary. We should fetch user authData through /api/user
          setUser({
            id: authData.username,
            username: authData.username,
            lname: userData.lname,
            fname: userData.fname,
            dob: userData.dob, // might need to change to Date object
            email: userData.email,
            joindate: userData.joindate,
            profilephoto: userData.profilephoto,
            following: followData.followees,
            followers: followData.followers
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
    localStorage.setItem('user', user);
  }, [user]);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}
