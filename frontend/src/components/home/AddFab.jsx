import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddFab = ({ handleAddOpen }) => {
  return (
    <Box
      position="fixed"
      bottom={{ xs: 0, md: 30 }}
      right={{ xs: 0, md: 25 }}
      textAlign="right"
      mr={5}
      mb={2}
    >
      <Fab color="primary" onClick={handleAddOpen}>
        <Add />
      </Fab>
    </Box>
  );
};

export default AddFab;
