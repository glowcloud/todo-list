import { Chip } from "@mui/material";
import { getColor } from "../../utils/generalUtils";

const TaskChip = ({ text }) => {
  return (
    <Chip
      label={text}
      sx={{ backgroundColor: getColor(text), color: "white", filter: "grayscale(20%)", fontWeight: "500" }}
    />
  );
};

export default TaskChip;
