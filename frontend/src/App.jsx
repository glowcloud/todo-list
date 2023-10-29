import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
