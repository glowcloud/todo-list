import { Chip } from "@mui/material";

const TaskChip = ({ text, color }) => {
  return <Chip label={text} sx={{ backgroundColor: color, color: "white" }} />;
};

export default TaskChip;
