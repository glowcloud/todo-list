import { Drawer, Toolbar } from "@mui/material";
import SidebarList from "./SidebarList";

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
        }}
      >
        <Toolbar />
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
          },
        }}
      >
        <Toolbar />
        <SidebarList setCurrentView={setCurrentView} />
      </Drawer>
    </>
  );
};

export default Sidebar;
