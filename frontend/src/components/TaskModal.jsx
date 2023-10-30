import { Close, Edit } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
const TaskModal = ({ task, isOpen, handleModalClose }) => {
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
        <Typography variant="h5" gutterBottom>
          {task?.title}
        </Typography>
        <Typography gutterBottom>{task?.description}</Typography>
      </Box>
    </Modal>
  );
};

export default TaskModal;
