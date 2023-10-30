import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const defaultState = {
  title: "",
  description: "",
  date: "",
  priority: "",
};

/* eslint-disable react/prop-types */
const AddModal = ({ isOpen, handleModalClose, handleAddTask }) => {
  const [formState, setFormState] = useState(defaultState);

  const handleAdd = () => {
    if (formState.title !== "") {
      handleAddTask(formState);
      setFormState(defaultState);
      handleModalClose();
    }
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
          border: "2px solid #000",
          width: 500,
          px: 5,
          pb: 5,
        }}
      >
        <Box textAlign="right" pt={3}>
          <IconButton onClick={handleModalClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="h5">Add a new task</Typography>
        <Box component="form" pt={1} pr={1}>
          <TextField
            label="Title"
            value={formState.title}
            onChange={(e) =>
              setFormState((prevState) => {
                return { ...prevState, title: e.target.value };
              })
            }
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={formState.description}
            onChange={(e) =>
              setFormState((prevState) => {
                return { ...prevState, description: e.target.value };
              })
            }
            margin="normal"
            multiline
            rows={4}
            fullWidth
          />
          <Button sx={{ mt: 1 }} variant="outlined" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddModal;
