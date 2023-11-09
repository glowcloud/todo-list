import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomModal from "./CustomModal";
import { DateTimePicker, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const defaultState = {
  title: "",
  description: "",
  startDate: dayjs(),
  endDate: dayjs().add(5, "minutes"),
  priority: 3,
};

/* eslint-disable react/prop-types */
const AddModal = ({
  isOpen,
  handleModalClose,
  handleAddTask,
  priorities,
  addingTask,
}) => {
  const [formState, setFormState] = useState(defaultState);
  const [isAllDay, setIsAllDay] = useState(true);

  const handleAdd = async () => {
    if (
      formState.title !== "" &&
      formState.startDate !== null &&
      (isAllDay ||
        (formState.endDate !== null &&
          formState.endDate.isAfter(formState.startDate))) &&
      formState.priority > 0
    ) {
      await handleAddTask({ ...formState, allDay: isAllDay });
      setFormState(defaultState);
      handleModalClose();
    }
  };

  const handleClose = () => {
    if (!addingTask) {
      setFormState(defaultState);
      handleModalClose();
    }
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
          disabled={addingTask}
        />
        <Box>
          <FormControlLabel
            label="No time"
            checked={isAllDay}
            disabled={addingTask}
            control={
              <Checkbox
                value={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
              />
            }
          />
        </Box>
        {isAllDay && (
          <>
            <DatePicker
              label="Start"
              orientation="portrait"
              value={formState.startDate}
              disablePast
              disabled={addingTask}
              sx={{
                my: 1,
                mr: 1,
              }}
              onChange={(value) => {
                setFormState((prevState) => {
                  return { ...prevState, startDate: value, endDate: value };
                });
              }}
            />
            <DatePicker
              label="End"
              orientation="portrait"
              value={formState.endDate}
              disablePast
              disabled={addingTask}
              sx={{
                my: 1,
                mr: 1,
              }}
              onChange={(value) => {
                setFormState((prevState) => {
                  return { ...prevState, endDate: value };
                });
              }}
            />
          </>
        )}
        {!isAllDay && (
          <>
            <DateTimePicker
              label="Start"
              orientation="portrait"
              value={formState.startDate}
              ampm={false}
              timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
              disablePast
              disabled={addingTask}
              sx={{
                my: 1,
                mr: 1,
              }}
              onChange={(value) => {
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    startDate: value,
                    endDate: value.add(5, "minutes"),
                  };
                });
              }}
            />
            <DateTimePicker
              label="End"
              orientation="portrait"
              value={formState.endDate}
              ampm={false}
              timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
              minDateTime={formState.startDate.add(5, "minutes")}
              disablePast
              disabled={addingTask}
              sx={{
                my: 1,
              }}
              onChange={(value) => {
                setFormState((prevState) => {
                  return { ...prevState, endDate: value };
                });
              }}
            />
          </>
        )}
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={formState.priority}
            label="Priority"
            disabled={addingTask}
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
          disabled={addingTask}
        />
        <Box sx={{ mt: 3, textAlign: "center", position: "relative" }}>
          <Button variant="outlined" disabled={addingTask} onClick={handleAdd}>
            Add
          </Button>
          {addingTask && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AddModal;
