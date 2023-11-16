import { Box, Typography, CircularProgress } from "@mui/material";

const LoadingProgress = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        my: 40,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }} gutterBottom>
        Loading...
      </Typography>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default LoadingProgress;
