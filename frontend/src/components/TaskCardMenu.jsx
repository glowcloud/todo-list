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
import { useDataContext } from "../context/DataContext";
import ConfirmDialog from "./ConfirmDialog";

const menuItems = (
  finished,
  handleOpenDelete,
  handleOpenResend,
  handleOpenEdit
) => {
  if (!finished) {
    return [
      { text: "Resend", icon: <Email />, onClick: handleOpenResend },
      { text: "Edit", icon: <Edit />, onClick: handleOpenEdit },
      { text: "Delete", icon: <Delete />, onClick: handleOpenDelete },
    ];
  }
  return [{ text: "Delete", icon: <Delete />, onClick: handleOpenDelete }];
};

const TaskCardMenu = ({ task, handleEditOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false);
  const { loading, handleDeleteTask, handleResend } = useDataContext();

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleOpenDelete = () => {
    setAnchorEl(null);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    handleCloseDelete();
    setAnchorEl(null);
    await handleDeleteTask(task.id);
  };

  const handleCloseResend = () => {
    setIsResendDialogOpen(false);
  };

  const handleOpenResend = () => {
    setAnchorEl(null);
    setIsResendDialogOpen(true);
  };

  const handleResendConfirm = async () => {
    handleCloseResend();
    setAnchorEl(null);
    await handleResend(task);
  };

  const handleOpenEdit = () => {
    setAnchorEl(null);
    handleEditOpen();
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
        {menuItems(
          task.finished,
          handleOpenDelete,
          handleOpenResend,
          handleOpenEdit
        ).map((item) => (
          <MenuItem key={item.text} onClick={item.onClick} disabled={loading}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        handleClose={handleCloseDelete}
        handleConfirm={handleDeleteConfirm}
        title="Confirm delete"
        content="Are you sure you want to delete this task?"
      />
      <ConfirmDialog
        open={isResendDialogOpen}
        handleClose={handleCloseResend}
        handleConfirm={handleResendConfirm}
        title="Confirm resend"
        content="Do you want to resend this task?"
      />
    </Box>
  );
};

export default TaskCardMenu;
