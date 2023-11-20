import { Typography, Backdrop, CircularProgress } from "@mui/material";

const ResendingBackdrop = ({ isResending }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
      }}
      open={isResending}
    >
      <Typography variant="h6" sx={{ mb: 3 }} gutterBottom>
        Resending task...
      </Typography>

      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default ResendingBackdrop;
