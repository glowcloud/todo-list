import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("todo-token");
    if (localToken) {
      const validateToken = async () => {
        try {
          const res = await fetch("http://localhost:8080/validate", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localToken}`,
            },
          });
          if (res.ok) {
            setToken(localToken);
          }
        } catch (e) {
          console.log("Invalid token.");
        }
      };
      validateToken();
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
