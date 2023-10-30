/* eslint-disable react/prop-types */
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

const navItems = ["Task List", "Calendar", "Archive"];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <Drawer
      component="div"
      anchor="left"
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      sx={{
        width: "200px",
        "& .MuiDrawer-paper": {
          width: "200px",
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
