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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const defaultState = {
  title: "",
  description: "",
  date: dayjs(),
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
        <DatePicker
          label="Date"
          orientation="portrait"
          value={formState.date}
          format="YYYY-MM-DD"
          disablePast
          sx={{
            my: 1,
          }}
          onChange={(value) => {
            setFormState((prevState) => {
              return { ...prevState, date: value };
            });
          }}
        />
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={formState.priority}
            defaultValue={3}
            label="Priority"
            onChange={(e) =>
              setFormState((prevState) => {
                return { ...prevState, priority: e.target.value };
              })
            }
          >
            {priorities.map((priority) => (
              <MenuItem key={priority.id} value={priority.id}>
                {priority.name}
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
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button variant="outlined" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AddModal;
