/* eslint-disable react/prop-types */
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { token, handleSignOut } = useAuth();

  return (
    <Box display="flex">
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            To Do List
          </Typography>
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
