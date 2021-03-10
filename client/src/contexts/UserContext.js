import { useState, useContext, createContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';

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
      const res = await axios.get('/api/user');
      if (res.data.user) {
        setUser(res.data.user);
        setAuth(true);
        console.log('When the response is received from /api/user');
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('useEffect in UserContext');
    authenticateUser();
  }, []);

  useEffect(() => {
    console.log(user);
  });

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}
