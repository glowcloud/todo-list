import { Modal, Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
const CustomModal = ({ children, isOpen, handleClose }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          width: 500,
          px: 5,
          pb: 5,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
