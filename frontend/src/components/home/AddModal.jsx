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
import CustomModal from "../shared/CustomModal";
import { DateTimePicker, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useDataContext } from "../../context/DataContext";

const defaultState = {
  title: "",
  description: "",
  startDate: dayjs(),
  endDate: dayjs().add(5, "minutes"),
  priority: 3,
};

const AddModal = ({ isOpen, handleModalClose }) => {
  const [formState, setFormState] = useState(defaultState);
  const [isAllDay, setIsAllDay] = useState(true);
  const [error, setError] = useState(false);
  const { priorities, loading, handleAddTask } = useDataContext();

  const handleAdd = async () => {
    if (
      formState.title !== "" &&
      formState.startDate !== null &&
      formState.endDate !== null &&
      ((isAllDay &&
        (dayjs(formState.startDate).isAfter(dayjs()) ||
          dayjs().isSame(dayjs(formState.startDate), "d")) &&
        (dayjs(formState.endDate).isAfter(dayjs()) ||
          dayjs().isSame(dayjs(formState.endDate), "d"))) ||
        (dayjs(formState.startDate).isAfter(dayjs()) &&
          formState.endDate.isAfter(formState.startDate))) &&
      formState.priority > 0
    ) {
      await handleAddTask({ ...formState, allDay: isAllDay });
      setFormState(defaultState);
      handleModalClose();
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    if (!loading) {
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
          disabled={loading}
          error={error && !formState.title}
        />
        <Box>
          <FormControlLabel
            label="Only date"
            checked={isAllDay}
            disabled={loading}
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
              disabled={loading}
              sx={{
                my: 1,
                mr: 1,
              }}
              onChange={(value) => {
                setFormState((prevState) => {
                  return { ...prevState, startDate: value, endDate: value };
                });
              }}
              error={
                error &&
                dayjs(formState.startDate).isBefore(dayjs()) &&
                !dayjs().isSame(dayjs(formState.startDate), "d")
              }
            />
            <DatePicker
              label="End"
              orientation="portrait"
              value={formState.endDate}
              disablePast
              disabled={loading}
              sx={{
                my: 1,
                mr: 1,
              }}
              onChange={(value) => {
                setFormState((prevState) => {
                  return { ...prevState, endDate: value };
                });
              }}
              error={
                error &&
                dayjs(formState.endDate).isBefore(dayjs()) &&
                !dayjs().isSame(dayjs(formState.endDate), "d")
              }
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
              disabled={loading}
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
              error={error && dayjs(formState.startDate).isAfter(dayjs())}
            />
            <DateTimePicker
              label="End"
              orientation="portrait"
              value={formState.endDate}
              ampm={false}
              timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
              minDateTime={formState.startDate.add(5, "minutes")}
              disablePast
              disabled={loading}
              sx={{
                my: 1,
              }}
              onChange={(value) => {
                setFormState((prevState) => {
                  return { ...prevState, endDate: value };
                });
              }}
              error={
                error &&
                dayjs(formState.endDate).isAfter(dayjs()) &&
                dayjs(formState.endDate).isAfter(dayjs(formState.startDate))
              }
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
          inputProps={{maxLength: 255}}
        />
        <Box sx={{ mt: 3, textAlign: "center", position: "relative" }}>
          <Button variant="outlined" disabled={loading} onClick={handleAdd}>
            Add
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

export default AddModal;
