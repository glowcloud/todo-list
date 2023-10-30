import {
  CheckCircle,
  CheckCircleOutline,
  Close,
  Edit,
} from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
const TaskModal = ({
  task,
  isOpen,
  handleModalClose,
  handleCheckTask,
  priorities,
}) => {
  const handleCheck = () => {
    handleCheckTask(task.id, !task.finished);
  };

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          width: 500,
          px: 5,
          pb: 5,
        }}
      >
        <Box textAlign="right" pt={3}>
          <IconButton onClick={handleCheck}>
            {task?.finished ? <CheckCircle /> : <CheckCircleOutline />}
          </IconButton>
          <IconButton onClick={() => {}}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleModalClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography
          color={task?.finished ? "primary" : "secondary"}
          gutterBottom
        >
          {task?.finished ? "Finished" : "To Do"}
        </Typography>
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
      </Box>
    </Modal>
  );
};

export default TaskModal;
