import { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage("auth", false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
