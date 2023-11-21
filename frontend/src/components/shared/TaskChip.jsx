import { Chip } from "@mui/material";
import { getColor } from "../../utils/generalUtils";

const TaskChip = ({ text }) => {
  return (
    <Chip
      label={text}
      sx={{ backgroundColor: getColor(text), color: "white" }}
    />
  );
};

export default TaskChip;
