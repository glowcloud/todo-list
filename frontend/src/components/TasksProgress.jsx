import { Box, LinearProgress, Typography } from "@mui/material";

const TasksProgress = ({ value }) => {
  return (
    <Box display="flex" alignItems="center" mr={3} ml={2}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Typography variant="body2">{`${Math.round(value)}%`}</Typography>
    </Box>
  );
};

export default TasksProgress;
