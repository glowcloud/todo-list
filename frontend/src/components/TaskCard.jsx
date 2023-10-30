/* eslint-disable react/prop-types */
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

const TaskCard = ({ task, handleClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{ m: 2, backgroundColor: task.color }}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h5">{task.title}</Typography>
          <Typography>{task.description}</Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
            <IconButton>
              <MoreVert />
            </IconButton>
          </CardActions> */}
    </Card>
  );
};

export default TaskCard;
