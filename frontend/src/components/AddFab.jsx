import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const AddFab = ({ handleAddOpen }) => {
  return (
    <Box position="fixed" bottom={15} right={0} textAlign="right" mr={5} mb={2}>
      <Fab color="primary" onClick={handleAddOpen}>
        <Add />
      </Fab>
    </Box>
  );
};

export default AddFab;
