import { useContext, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage("auth", false);

  useEffect(() => {
    return () => localStorage.removeItem("cmpt354-auth");
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
