/* eslint-disable react/prop-types */
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
import { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EditModal = ({
  task,
  isOpen,
  handleModalClose,
  handleEditTask,
  priorities,
}) => {
  const [formState, setFormState] = useState({ ...task });

  useEffect(() => {
    if (task) {
      setFormState({
        ...task,
        date: dayjs(task.date),
        priority: task.priority.id,
      });
    }
  }, [task]);

  return (
    <CustomModal isOpen={isOpen} handleClose={handleModalClose}>
      <Box textAlign="right" pt={3}>
        <IconButton onClick={handleModalClose}>
          <Close />
        </IconButton>
      </Box>
      <Typography variant="h5">{`Edit ${task?.title}`}</Typography>
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
        <DateTimePicker
          label="Date"
          orientation="portrait"
          value={formState.date}
          ampm={false}
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
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
            label="Priority"
            onChange={(e) => {
              setFormState((prevState) => {
                return { ...prevState, priority: e.target.value };
              });
            }}
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
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button variant="outlined" onClick={() => handleEditTask(formState)}>
            Save changes
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default EditModal;
