import {
  CheckCircle,
  CheckCircleOutline,
  Close,
  Edit,
  Delete,
  Email,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import CustomModal from "./CustomModal";
import dayjs from "dayjs";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { isOverdue } from "../utils/generalUtils";
import { useDataContext } from "../context/DataContext";

const getFormattedDates = (startDate, endDate, allDay) => {
  if (dayjs(startDate).isSame(dayjs(endDate), "d")) {
    if (allDay) {
      return (
        <>
          <Typography variant="body2">
            on {dayjs(startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            all day
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="body2">
            on {dayjs(startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            from {dayjs(startDate).format("h:mm A")} to{" "}
            {dayjs(endDate).format("h:mm A")}
          </Typography>
        </>
      );
    }
  }
  if (allDay) {
    return (
      <>
        <Typography variant="body2">
          from {dayjs(startDate).format("DD/MM/YYYY")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          to {dayjs(endDate).format("DD/MM/YYYY")}
        </Typography>
      </>
    );
  }
  return (
    <>
      <Typography variant="body2">
        from {dayjs(startDate).format("h:mm A DD/MM/YYYY")}
      </Typography>
      <Typography variant="body2" gutterBottom>
        to {dayjs(endDate).format("h:mm A DD/MM/YYYY")}
      </Typography>
    </>
  );
};

const TaskModal = ({ task, isOpen, handleModalClose, handleEditOpen }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false);
  const { loading, handleDeleteTask, handleResend, handleCheckTask } =
    useDataContext();

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
    handleModalClose();
  };

  const handleCloseResend = () => {
    setIsResendDialogOpen(false);
  };

  const handleOpenResend = () => {
    setIsResendDialogOpen(true);
  };

  const handleResendConfirm = async () => {
    handleCloseResend();
    await handleResend(task);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={() => {
        if (!loading) handleModalClose();
      }}
    >
      <Box textAlign="right" pt={3}>
        <IconButton disabled={loading} onClick={handleCheck}>
          {task?.finished ? <CheckCircle /> : <CheckCircleOutline />}
        </IconButton>
        {!task?.finished && (
          <IconButton disabled={loading} onClick={handleOpenResend}>
            <Email />
          </IconButton>
        )}
        {!task?.finished && (
          <IconButton disabled={loading} onClick={handleEditOpen}>
            <Edit />
          </IconButton>
        )}
        <IconButton disabled={loading} onClick={handleOpenDelete}>
          <Delete />
        </IconButton>
        <IconButton disabled={loading} onClick={handleModalClose}>
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
      <Typography
        variant="h5"
        sx={{
          overflowWrap: "break-word",
          fontWeight: "bold",
        }}
        gutterBottom
      >
        {task?.title}
      </Typography>
      {task && getFormattedDates(task.startDate, task.endDate, task.allDay)}

      {task?.description && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Description:
          </Typography>
          <Typography
            sx={{
              overflowWrap: "break-word",
            }}
            gutterBottom
          >
            {task?.description}
          </Typography>
        </>
      )}
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
