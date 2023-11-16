import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataContext";
import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { alertMsg, setAlertMsg } = useDataContext();

  useEffect(() => {
    if (alertMsg) {
      setIsSnackbarOpen(true);
    }
  }, [alertMsg]);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    setAlertMsg("");
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        {alertMsg}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
