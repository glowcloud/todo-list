import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDataContext } from "../../context/DataContext";

const PriorityPicker = ({ priority, setFormState }) => {
  const { loading, priorities } = useDataContext();

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <InputLabel>Priority</InputLabel>
      <Select
        id="priority"
        value={priority}
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
  );
};

export default PriorityPicker;
