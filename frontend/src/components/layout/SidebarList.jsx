import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import {
  LightMode,
  DarkMode,
  ListOutlined,
  PriorityHigh,
  CalendarMonth,
  PieChart,
  Logout,
} from "@mui/icons-material";
import { useDataContext } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

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

const SidebarList = ({ setCurrentView }) => {
  const { getOverdueCount } = useDataContext();
  const { handleSignOut } = useAuth();
  const { mode, handleChangeMode } = useTheme();

  return (
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
};

export default SidebarList;
