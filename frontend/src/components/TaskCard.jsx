/* eslint-disable react/prop-types */
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Checkbox,
} from "@mui/material";

const TaskCard = ({ task, handleClick, handleCheckTask, priorities }) => {
  const handleCheck = (e) => {
    handleCheckTask(task.id, e.target.checked);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        m: 2,
        borderColor: priorities.find(
          (priority) => priority.id === task.priority
        ).color,
      }}
    >
      <Checkbox checked={task.finished} onChange={handleCheck} sx={{ px: 2 }} />
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              textDecoration: task.finished ? "line-through" : "none",
            }}
          >
            {task.title}
          </Typography>
          <Typography
            sx={{
              textDecoration: task.finished ? "line-through" : "none",
            }}
          >
            {task.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TaskCard;
