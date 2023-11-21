import { Box, LinearProgress, Typography } from "@mui/material";

const TasksProgress = ({ value }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        mx: { xs: 2, sm: 3, md: 11 },
        mt: { xs: 1, md: 2 },
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Typography variant="body2">{`${Math.round(value)}%`}</Typography>
    </Box>
  );
};

export default TasksProgress;
