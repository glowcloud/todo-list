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
import { DatePicker } from "@mui/x-date-pickers";
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
    setFormState({ ...task });
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
        <DatePicker
          label="Date"
          orientation="portrait"
          value={dayjs(formState.date)}
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
            value={formState?.priority ? formState.priority.id : 3}
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
