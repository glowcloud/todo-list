import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { useTheme } from "./context/ThemeContext";
import { DataContextProvider } from "./context/DataContext";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";

function App() {
  const { mode } = useTheme();
  const { token } = useAuth();
  const [currentView, setCurrentView] = useState("list");

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {}
        : {
            primary: {
              main: "#90caf9",
            },
            text: {
              primary: "#ffffff",
              secondary: "b3b3b3",
            },
            background: {
              default: "#121212",
              paper: "#282828",
            },
          }),
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout currentView={currentView} setCurrentView={setCurrentView}>
            {token ? <Home currentView={currentView} /> : <Login />}
          </Layout>
        </ThemeProvider>
      </DataContextProvider>
    </LocalizationProvider>
  );
}

export default App;
