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

  const handleSignIn = async (email, password) => {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (json.jwt) {
      localStorage.setItem("todo-token", json.jwt);
      setToken(json.jwt);
      return true;
    }
    return false;
  };

  const handleSignUp = async (email, password) => {
    const res = await fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (json.jwt) {
      localStorage.setItem("todo-token", json.jwt);
      setToken(json.jwt);
      return true;
    }
    return false;
  };

  const handleSignOut = () => {
    localStorage.removeItem("todo-token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, handleSignIn, handleSignUp, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
