import {
  CheckCircle,
  CheckCircleOutline,
  Close,
  Edit,
  Delete,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import CustomModal from "./CustomModal";
import dayjs from "dayjs";

/* eslint-disable react/prop-types */
const TaskModal = ({
  task,
  isOpen,
  handleModalClose,
  handleCheckTask,
  handleEditOpen,
  handleDeleteTask,
}) => {
  const handleCheck = () => {
    handleCheckTask(task.id, !task.finished);
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleModalClose}>
      <Box textAlign="right" pt={3}>
        <IconButton onClick={handleCheck}>
          {task?.finished ? <CheckCircle /> : <CheckCircleOutline />}
        </IconButton>
        {!task?.finished && (
          <IconButton onClick={handleEditOpen}>
            <Edit />
          </IconButton>
        )}
        <IconButton onClick={() => handleDeleteTask(task.id)}>
          <Delete />
        </IconButton>
        <IconButton onClick={handleModalClose}>
          <Close />
        </IconButton>
      </Box>
      <Typography color={task?.finished ? "primary" : "secondary"} gutterBottom>
        {task?.finished ? "Finished" : "To Do"}
      </Typography>
      {!task?.finished && (
        <Typography
          color={
            task ? (task.finished ? "primary.main" : task.priority.color) : ""
          }
          gutterBottom
        >
          {task && task.priority.name} priority
        </Typography>
      )}
      <Typography gutterBottom>
        {task ? dayjs(task.date).toDate().toLocaleString() : ""}
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
    </CustomModal>
  );
};

export default TaskModal;
