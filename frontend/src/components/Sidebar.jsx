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
} from "@mui/icons-material";
import { useDataContext } from "../context/DataContext";

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

  return (
    <Drawer
      component="nav"
      anchor="left"
      // open={isSidebarOpen}
      variant="permanent"
      // onClose={() => setIsSidebarOpen(false)}
      sx={{
        width: "200px",
        "& .MuiDrawer-paper": {
          width: "200px",
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems(getOverdueCount()).map((item) => (
          <ListItem key={item.view} disablePadding>
            <ListItemButton onClick={() => setCurrentView(item.view)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
