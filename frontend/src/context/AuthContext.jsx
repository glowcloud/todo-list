import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("todo-user");
    if (localUser) {
      // validate token on backend
      setUser(localUser);
    }
  }, []);

  const handleSignIn = (newUser) => {
    console.log(newUser);
    localStorage.setItem("todo-user", newUser.id);
    setUser(newUser);
  };

  const handleSignOut = () => {
    localStorage.removeItem("todo-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
