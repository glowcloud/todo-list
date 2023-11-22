import { Modal, Box } from "@mui/material";

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
          border: "2px solid #aaa",
          width: { xs: 350, sm: 550, md: 700, lg: 800 },
          px: { xs: 2, sm: 5 },
          pb: 5,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
