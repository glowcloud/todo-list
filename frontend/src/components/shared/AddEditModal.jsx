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
import { useState, useEffect } from "react";
import CustomModal from "../shared/CustomModal";
import dayjs from "dayjs";
import { useDataContext } from "../../context/DataContext";
import CustomDatePicker from "./CustomDatePicker";
import CustomDateTimePicker from "./CustomDateTimePicker";

const defaultState = {
  title: "",
  description: "",
  startDate: dayjs(),
  endDate: dayjs().add(5, "minutes"),
  priority: 3,
  allDay: true,
};

const isFormValid = (formState) => {
  return (
    formState.title !== "" &&
    formState.startDate !== null &&
    formState.endDate !== null &&
    formState.description.length < 255 &&
    (dayjs(formState.endDate).isAfter(dayjs(formState.startDate)) ||
      dayjs(formState.endDate).isSame(dayjs(formState.startDate))) &&
    formState.priority > 0
  );
};

const isDateError = (error, formState) => {
  return (
    error &&
    (dayjs(formState.endDate).isBefore(dayjs(formState.startDate)) ||
      dayjs(formState.endDate).isSame(dayjs(formState.startDate)))
  );
};

const AddEditModal = ({ task, isOpen, handleModalClose, isEdit }) => {
  const [formState, setFormState] = useState(task ? task : defaultState);
  //   const [isAllDay, setIsAllDay] = useState(true);
  const [error, setError] = useState(false);
  const { priorities, loading, handleAddTask, handleEditTask } =
    useDataContext();

  useEffect(() => {
    if (task && isEdit) {
      setFormState({
        ...task,
        startDate: dayjs(task.startDate),
        endDate: dayjs(task.endDate),
        priority: task.priority.id,
      });
      //   setIsAllDay(task.allDay !== null ? task.allDay : false);
    } else {
      setFormState(defaultState);
    }
  }, [task, isEdit]);

  const handleClose = () => {
    if (!loading) {
      setError(false);
      setFormState(defaultState);
      handleModalClose();
    }
  };

  const handleClick = async () => {
    if (isFormValid(formState)) {
      if (isEdit) {
        await handleEditTask({ ...formState }); //, allDay: isAllDay });
      } else {
        await handleAddTask({ ...formState }); //, allDay: isAllDay });
      }
      handleClose();
    } else {
      setError(true);
    }
  };

  const handleStartChange = (value) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        startDate: value,
        endDate: dayjs(value).add(5, "minutes"),
      };
    });
  };

  const handleEndChange = (value) => {
    if (formState.allDay) {
      value = value.add(5, "minutes");
    }
    setFormState((prevState) => {
      return { ...prevState, endDate: value };
    });
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
          disabled={loading}
          error={error && !formState.title}
        />
        <Box>
          <FormControlLabel
            label="Only date"
            checked={formState.allDay}
            disabled={loading}
            control={
              <Checkbox
                value={formState.allDay}
                onChange={(e) =>
                  setFormState((prevState) => {
                    return { ...prevState, allDay: e.target.checked };
                  })
                }
              />
            }
          />
        </Box>
        {formState.allDay ? (
          <>
            <CustomDatePicker
              label="Start"
              value={formState.startDate}
              handleChange={handleStartChange}
              error={isDateError(error, formState)}
            />

            <CustomDatePicker
              label="End"
              value={formState.endDate}
              handleChange={handleEndChange}
              error={isDateError(error, formState)}
              minDate={{ minDate: formState.startDate }}
            />
          </>
        ) : (
          <>
            <CustomDateTimePicker
              label="Start"
              value={formState.startDate}
              handleChange={handleStartChange}
              error={isDateError(error, formState)}
            />
            <CustomDateTimePicker
              label="End"
              value={formState.endDate}
              handleChange={handleEndChange}
              error={isDateError(error, formState)}
              minDateTime={{
                minDateTime: dayjs(formState.startDate).add(5, "minutes"),
              }}
            />
          </>
        )}
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={formState.priority}
            label="Priority"
            disabled={loading}
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
          disabled={loading}
          inputProps={{ maxLength: 255 }}
        />
        <Box sx={{ mt: 3, textAlign: "center", position: "relative" }}>
          <Button variant="outlined" disabled={loading} onClick={handleClick}>
            {isEdit ? "Save changes" : "Add"}
          </Button>
          {loading && (
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

export default AddEditModal;
