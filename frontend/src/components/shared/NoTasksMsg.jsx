import { Box, Typography } from "@mui/material";

const NoTasksMsg = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5">No tasks found.</Typography>
    </Box>
  );
};

export default NoTasksMsg;
