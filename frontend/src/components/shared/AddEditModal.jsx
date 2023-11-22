import { Close } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import CustomModal from "../shared/CustomModal";
import dayjs from "dayjs";
import { useDataContext } from "../../context/DataContext";
import { defaultState, isFormValid } from "../../utils/addEditUtils";
import PriorityPicker from "./PriorityPicker";
import AddEditConfirmButton from "./AddEditConfirmButton";
import AddEditDates from "./AddEditDates";

const AddEditModal = ({ task, isOpen, handleModalClose, isEdit }) => {
  const [formState, setFormState] = useState(task ? task : defaultState);
  const [error, setError] = useState(false);
  const { loading, handleAddTask, handleEditTask } = useDataContext();

  useEffect(() => {
    if (task && isEdit) {
      setFormState({
        ...task,
        startDate: dayjs(task.startDate),
        endDate: dayjs(task.endDate),
        priority: task.priority.id,
      });
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
        await handleEditTask({ ...formState });
      } else {
        await handleAddTask({ ...formState });
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
        <AddEditDates
          formState={formState}
          handleStartChange={handleStartChange}
          handleEndChange={handleEndChange}
          error={error}
        />
        <PriorityPicker
          priority={formState.priority}
          setFormState={setFormState}
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
          disabled={loading}
          inputProps={{ maxLength: 255 }}
        />
        <AddEditConfirmButton handleClick={handleClick} isEdit={isEdit} />
      </Box>
    </CustomModal>
  );
};

export default AddEditModal;
