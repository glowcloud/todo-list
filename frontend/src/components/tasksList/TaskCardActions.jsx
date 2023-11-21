import { CardActions, IconButton } from "@mui/material";
import {
  CheckCircle,
  CheckCircleOutline,
  ExpandMore,
} from "@mui/icons-material";

const TaskCardActions = ({ task, handleCheck, handleExpandedClick }) => {
  return (
    <CardActions disableSpacing>
      <IconButton onClick={handleCheck} sx={{ marginLeft: "auto" }}>
        {task?.finished ? <CheckCircle /> : <CheckCircleOutline />}
      </IconButton>
      {task?.description && (
        <IconButton onClick={handleExpandedClick}>
          <ExpandMore />
        </IconButton>
      )}
    </CardActions>
  );
};

export default TaskCardActions;
