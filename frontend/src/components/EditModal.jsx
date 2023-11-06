/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { DateTimePicker, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EditModal = ({
  task,
  isOpen,
  handleModalClose,
  handleEditTask,
  priorities,
}) => {
  const [formState, setFormState] = useState({ ...task });
  const [isAllDay, setIsAllDay] = useState(false);

  useEffect(() => {
    if (task) {
      setFormState({
        ...task,
        startDate: dayjs(task.startDate),
        endDate: dayjs(task.endDate),
        priority: task.priority.id,
      });
      setIsAllDay(task.allDay !== null ? task.allDay : false);
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
        <Box>
          <FormControlLabel
            label="No time"
            checked={isAllDay}
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
              minDateTime={
                formState.startDate ? formState.startDate.add(5, "minutes") : ""
              }
              disablePast
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
          <Button
            variant="outlined"
            onClick={() => handleEditTask({ ...formState, allDay: isAllDay })}
          >
            Save changes
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default EditModal;
