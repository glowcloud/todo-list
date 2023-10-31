import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomModal from "./CustomModal";

const defaultState = {
  title: "",
  description: "",
  date: "",
  priority: 2,
};

/* eslint-disable react/prop-types */
const AddModal = ({ isOpen, handleModalClose, handleAddTask, priorities }) => {
  const [formState, setFormState] = useState(defaultState);

  const handleAdd = () => {
    if (formState.title !== "") {
      if (formState.priority < 0) {
        handleAddTask({ ...formState, priority: 2 });
      } else {
        handleAddTask(formState);
      }
      setFormState(defaultState);
      handleModalClose();
    }
  };

  const handleClose = () => {
    setFormState(defaultState);
    handleModalClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <Box textAlign="right" pt={3}>
        <IconButton onClick={handleClose}>
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
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={formState.priority}
            defaultValue={2}
            label="Priority"
            onChange={(e) =>
              setFormState((prevState) => {
                return { ...prevState, priority: e.target.value };
              })
            }
          >
            {priorities.map((priority) => (
              <MenuItem key={priority.id} value={priority.id}>
                {priority.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
    </CustomModal>
  );
};

export default AddModal;
