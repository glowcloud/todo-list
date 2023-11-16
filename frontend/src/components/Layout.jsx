import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Menu } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import CustomSnackbar from "./CustomSnackbar";
import { useState } from "react";

const Layout = ({ currentView, setCurrentView, children }) => {
  const { token } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen((prevSidebar) => !prevSidebar);
  };

  return (
    <Box display="flex">
      <AppBar
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton onClick={handleMenuClick}>
            <Menu sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {token && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      )}
      <Box component="main" width="100%">
        <Toolbar sx={{ display: { xs: "block", md: "none" }, mt: 2 }} />
        {children}
        <CustomSnackbar />
      </Box>
    </Box>
  );
};

export default Layout;
