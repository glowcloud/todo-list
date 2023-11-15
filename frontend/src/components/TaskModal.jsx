import {
  CheckCircle,
  CheckCircleOutline,
  Close,
  Edit,
  Delete,
  Email,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import CustomModal from "./CustomModal";
import dayjs from "dayjs";
import { useState } from "react";
import { sendTask } from "../utils/calendarIntegrationUtils";
import ConfirmDialog from "./ConfirmDialog";
import { isOverdue } from "../utils/generalUtils";
import { useAuth } from "../context/AuthContext";

/* eslint-disable react/prop-types */
const TaskModal = ({
  task,
  isOpen,
  handleModalClose,
  handleCheckTask,
  handleEditOpen,
  handleDeleteTask,
  setAlertMsg,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { token } = useAuth();

  const handleCheck = () => {
    handleCheckTask(task.id, !task.finished);
  };

  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleOpenDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    handleCloseDelete();
    await handleDeleteTask(task.id);
    setAlertMsg("Task deleted.");
  };

  const handleCloseResend = () => {
    setIsResendDialogOpen(false);
  };

  const handleOpenResend = () => {
    setIsResendDialogOpen(true);
  };

  const handleResendConfirm = async () => {
    handleCloseResend();
    await handleResend();
  };

  const handleResend = async () => {
    setIsResending(true);
    await sendTask(task, token);
    setIsResending(false);
    setAlertMsg("Task resent.");
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={() => {
        if (!isResending) handleModalClose();
      }}
    >
      <Box textAlign="right" pt={3}>
        <IconButton disabled={isResending} onClick={handleCheck}>
          {task?.finished ? <CheckCircle /> : <CheckCircleOutline />}
        </IconButton>
        {!task?.finished && (
          <IconButton disabled={isResending} onClick={handleOpenResend}>
            <Email />
          </IconButton>
        )}
        {!task?.finished && (
          <IconButton disabled={isResending} onClick={handleEditOpen}>
            <Edit />
          </IconButton>
        )}
        <IconButton disabled={isResending} onClick={handleOpenDelete}>
          <Delete />
        </IconButton>
        <IconButton disabled={isResending} onClick={handleModalClose}>
          <Close />
        </IconButton>
      </Box>
      <Typography
        color={
          task?.finished
            ? "primary.main"
            : isOverdue(task)
            ? "rgb(244, 67, 54)"
            : "secondary"
        }
        gutterBottom
      >
        {task?.finished ? "Finished" : isOverdue(task) ? "Overdue" : "To Do"}
      </Typography>
      {
        <Typography
          color={
            task ? (task.finished ? "primary.main" : task.priority.color) : ""
          }
          gutterBottom
        >
          {task && task.priority.name} priority
        </Typography>
      }
      <Typography gutterBottom>
        {task
          ? `Start: ${
              task.allDay
                ? dayjs(task.startDate).format("DD/MM/YYYY")
                : dayjs(task.startDate).toDate().toLocaleString()
            }`
          : ""}
      </Typography>
      <Typography gutterBottom>
        {task
          ? `End: ${
              task.allDay
                ? dayjs(task.endDate).format("DD/MM/YYYY")
                : dayjs(task.endDate).toDate().toLocaleString()
            }`
          : ""}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          overflowWrap: "break-word",
        }}
        gutterBottom
      >
        {task?.title}
      </Typography>
      <Typography
        sx={{
          overflowWrap: "break-word",
        }}
        gutterBottom
      >
        {task?.description}
      </Typography>
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
    </CustomModal>
  );
};

export default TaskModal;
