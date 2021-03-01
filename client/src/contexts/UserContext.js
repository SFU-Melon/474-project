import { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

//custom Hook()
export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const authenticateUser = async () => {
    try {
      const res = await axios.get('/api/user');
      console.log(res);
      if (res) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('useEffect in userContext');
    authenticateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {console.log(user)}
      {children}
    </UserContext.Provider>
  );
}
