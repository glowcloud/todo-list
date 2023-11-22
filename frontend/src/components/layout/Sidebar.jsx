import { Drawer, Toolbar, Box } from "@mui/material";
import SidebarList from "./SidebarList";
import logo from "../../assets/logo.png";
import Logo from "../shared/Logo";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setCurrentView }) => {
  return (
    <>
      <Drawer
        component="nav"
        anchor="left"
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: "200px",
          "& .MuiDrawer-paper": {
            width: "200px",
          },
          alignItems: "center",
        }}
      >
        <Logo />
        <SidebarList setCurrentView={setCurrentView} />
      </Drawer>
      <Drawer
        component="nav"
        anchor="left"
        open={isSidebarOpen}
        variant="temporary"
        onClose={() => setIsSidebarOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          width: "200px",
          "& .MuiDrawer-paper": {
            width: "200px",
            backgroundImage: "none",
          },
        }}
      >
        <Toolbar />
        <Box display="flex" alignItems="center" justifyContent="center" my={2}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            width={180}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => setCurrentView("list")}
          />
        </Box>
        <SidebarList setCurrentView={setCurrentView} />
      </Drawer>
    </>
  );
};

export default Sidebar;
