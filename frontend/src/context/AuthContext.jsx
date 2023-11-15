import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("todo-token");
    if (localToken) {
      // validate token on backend
      setToken(localToken);
    }
  }, []);

  const handleSignIn = (newToken) => {
    localStorage.setItem("todo-token", newToken);
    setToken(newToken);
  };

  const handleSignOut = () => {
    localStorage.removeItem("todo-token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
