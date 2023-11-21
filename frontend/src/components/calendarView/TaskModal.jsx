import { Typography } from "@mui/material";
import CustomModal from "../shared/CustomModal";
import { useState } from "react";
import ConfirmDialog from "../shared/ConfirmDialog";
import { useDataContext } from "../../context/DataContext";
import TaskChipStack from "../shared/TaskChipStack";
import TaskModalButtons from "./TaskModalButtons";
import FormattedDates from "../shared/FormattedDates";
import TaskModalDescription from "./TaskModalDescription";

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
      <TaskModalButtons
        task={task}
        handleCheck={handleCheck}
        handleOpenResend={handleOpenResend}
        handleEditOpen={handleEditOpen}
        handleOpenDelete={handleOpenDelete}
        handleModalClose={handleModalClose}
      />
      <TaskChipStack task={task} />
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
      {task && (
        <FormattedDates
          startDate={task.startDate}
          endDate={task.endDate}
          allDay={task.allDay}
          finished={task.finished}
          isModal
        />
      )}
      {task?.description && (
        <TaskModalDescription description={task.description} />
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
