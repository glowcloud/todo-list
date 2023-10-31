import {
  CheckCircle,
  CheckCircleOutline,
  Close,
  Edit,
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
  priorities,
  handleEditOpen,
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
            task
              ? task.finished
                ? "primary.main"
                : priorities.find((priority) => priority.id === task.priority)
                    .color
              : ""
          }
          gutterBottom
        >
          {task &&
            priorities.find((priority) => priority.id === task.priority)
              .text}{" "}
          priority
        </Typography>
      )}
      <Typography gutterBottom>
        {dayjs(task?.date).format("YYYY-MM-DD")}
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
