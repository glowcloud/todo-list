import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState();

  useEffect(() => {
    const localMode = localStorage.getItem("todo-mode");
    if (localMode) {
      setMode(localMode);
    } else {
      setMode("dark");
    }
  }, []);

  const handleChangeMode = () => {
    setMode((prevMode) => {
      if (prevMode === "dark") {
        localStorage.setItem("todo-mode", "light");
        return "light";
      } else {
        localStorage.setItem("todo-mode", "dark");
        return "dark";
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, handleChangeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
