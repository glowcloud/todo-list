import { Box, IconButton } from "@mui/material";
import {
  CheckCircle,
  CheckCircleOutline,
  Close,
  Edit,
  Delete,
  Email,
} from "@mui/icons-material";
import { useDataContext } from "../../context/DataContext";

const TaskModalButtons = ({
  task,
  handleCheck,
  handleOpenResend,
  handleEditOpen,
  handleOpenDelete,
  handleModalClose,
}) => {
  const { loading } = useDataContext();

  return (
    <Box textAlign="right" pt={3}>
      <IconButton disabled={loading} onClick={handleCheck}>
        {task?.finished ? <CheckCircle /> : <CheckCircleOutline />}
      </IconButton>
      {!task?.finished && (
        <IconButton disabled={loading} onClick={handleOpenResend}>
          <Email />
        </IconButton>
      )}
      {!task?.finished && (
        <IconButton disabled={loading} onClick={handleEditOpen}>
          <Edit />
        </IconButton>
      )}
      <IconButton disabled={loading} onClick={handleOpenDelete}>
        <Delete />
      </IconButton>
      <IconButton disabled={loading} onClick={handleModalClose}>
        <Close />
      </IconButton>
    </Box>
  );
};

export default TaskModalButtons;
