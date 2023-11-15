import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { mode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {}
        : {
            primary: {
              main: "#90caf9",
            },
            secondary: {
              main: "#f9b690",
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
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Home />
          </Layout>
        </ThemeProvider>
      </AuthContextProvider>
    </LocalizationProvider>
  );
}

export default App;
