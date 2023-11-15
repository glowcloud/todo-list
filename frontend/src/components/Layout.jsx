/* eslint-disable react/prop-types */
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { token, handleSignOut } = useAuth();
  const { mode, handleChangeMode } = useTheme();

  return (
    <Box display="flex">
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            To Do List
          </Typography>
          {mode === "light" && (
            <IconButton onClick={handleChangeMode}>
              <LightMode sx={{color: "white"}} />
            </IconButton>
          )}
          {mode === "dark" && (
            <IconButton onClick={handleChangeMode}>
              <DarkMode />
            </IconButton>
          )}
          {token && (
            <Button
              variant="text"
              size="large"
              sx={{ color: "white" }}
              onClick={handleSignOut}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" width="100%">
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
