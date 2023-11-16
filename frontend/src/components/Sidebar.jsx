import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Badge,
} from "@mui/material";
import {
  CalendarMonth,
  PieChart,
  ListOutlined,
  PriorityHigh,
  Logout,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useDataContext } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navItems = (badgeContent) => {
  return [
    { text: "Tasks", icon: <ListOutlined />, view: "list" },
    {
      text: "Overdue",
      icon: (
        <Badge badgeContent={badgeContent} color="error">
          <PriorityHigh />
        </Badge>
      ),
      view: "overdue",
    },
    { text: "Calendar", icon: <CalendarMonth />, view: "calendar" },
    { text: "Summary", icon: <PieChart />, view: "summary" },
  ];
};

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  currentView,
  setCurrentView,
}) => {
  const { getOverdueCount } = useDataContext();
  const { handleSignOut } = useAuth();
  const { mode, handleChangeMode } = useTheme();

  const drawerList = (
    <List>
      {navItems(getOverdueCount()).map((item) => (
        <ListItem key={item.view} disablePadding>
          <ListItemButton onClick={() => setCurrentView(item.view)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
      {mode === "dark" ? (
        <ListItem key="mode" disablePadding>
          <ListItemButton onClick={handleChangeMode}>
            <ListItemIcon>
              <LightMode />
            </ListItemIcon>
            <ListItemText primary="Light mode" />
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItem key="mode" disablePadding>
          <ListItemButton onClick={handleChangeMode}>
            <ListItemIcon>
              <DarkMode />
            </ListItemIcon>
            <ListItemText primary="Dark mode" />
          </ListItemButton>
        </ListItem>
      )}
      <ListItem key="logout" disablePadding>
        <ListItemButton onClick={handleSignOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </List>
  );

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
        {drawerList}
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
        {drawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;
