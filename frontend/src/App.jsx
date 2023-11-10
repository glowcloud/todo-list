import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const theme = createTheme({
    palette: {
      // mode: "dark",
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
