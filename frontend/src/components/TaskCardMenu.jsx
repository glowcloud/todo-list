import {
  Box,
  MenuItem,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Edit, Delete, Email, MoreVert } from "@mui/icons-material";
import { useState } from "react";

const menuItems = (finished) => {
  if (!finished) {
    return [
      { text: "Resend", icon: <Email />, onClick: () => {} },
      { text: "Edit", icon: <Edit />, onClick: () => {} },
      { text: "Delete", icon: <Delete />, onClick: () => {} },
    ];
  }
  return [{ text: "Delete", icon: <Delete />, onClick: () => {} }];
};

const TaskCardMenu = ({ finished }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          textAlign: "center",
        }}
      >
        {menuItems(finished).map((item) => (
          <MenuItem key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TaskCardMenu;
