import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Menu } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import CustomSnackbar from "./CustomSnackbar";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Layout = ({ currentView, setCurrentView, children }) => {
  const { token } = useAuth();
  const { mode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen((prevSidebar) => !prevSidebar);
  };

  return (
    <Box display="flex">
      {token && (
        <AppBar
          sx={{
            display: { xs: "block", md: "none" },
            zIndex: (theme) => theme.zIndex.drawer + 2,
            backgroundColor: mode === "light" ? "#282828" : "",
          }}
        >
          <Toolbar>
            <IconButton onClick={handleMenuClick}>
              <Menu sx={{ color: "white" }} />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                mx: 3,
                fontWeight: "500",
                fontSize: 22,
                width: "100%",
                textAlign: "center",
                pr: 4,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => setCurrentView("list")}
            >
              Verdo
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      {token && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      )}
      <Box component="main" width="100%">
        <Toolbar />
        {children}
        <CustomSnackbar />
      </Box>
    </Box>
  );
};

export default Layout;
