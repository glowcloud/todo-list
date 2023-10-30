/* eslint-disable react/prop-types */
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu } from "@mui/icons-material";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Box display="flex">
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton onClick={handleMenuClick} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6">To Do List</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box component="main" width="100%">
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
