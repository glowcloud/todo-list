/* eslint-disable react/prop-types */
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Checkbox,
  Box,
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
        alignItems: "center",
        m: 2,
      }}
    >
      <Checkbox checked={task.finished} onChange={handleCheck} sx={{ px: 2 }} />
      <CardActionArea
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        <Box
          sx={{
            mr: 2,
            backgroundColor: task.finished
              ? "primary.main"
              : priorities.find((priority) => priority.id === task.priority)
                  .color,
            width: 20,
            height: 20,
            borderRadius: "50%",
          }}
        />
      </CardActionArea>
    </Card>
  );
};

export default TaskCard;
