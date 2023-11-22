import { Box, Button, CircularProgress } from "@mui/material";
import { useDataContext } from "../../context/DataContext";

const AddEditConfirmButton = ({ handleClick, isEdit }) => {
  const { loading } = useDataContext();

  return (
    <Box sx={{ mt: 3, textAlign: "center", position: "relative" }}>
      <Button variant="outlined" disabled={loading} onClick={handleClick}>
        {isEdit ? "Save changes" : "Add"}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: "primary",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default AddEditConfirmButton;
