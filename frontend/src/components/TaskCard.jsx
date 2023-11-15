import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Checkbox,
  Box,
} from "@mui/material";
import dayjs from "dayjs";

const TaskCard = ({ task, handleClick, handleCheckTask }) => {
  const handleCheck = async (e) => {
    await handleCheckTask(task.id, e.target.checked);
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
              overflowWrap: "break-word",
              width: { xs: 200, sm: 425 },
            }}
          >
            {task.title}
          </Typography>
          <Typography
            sx={{
              textDecoration: task.finished ? "line-through" : "none",
              overflowWrap: "break-word",
              width: { xs: 200, sm: 425 },
            }}
            noWrap
          >
            {task.description}
          </Typography>
        </CardContent>
        <Box
          sx={{
            mr: 2,
            backgroundColor: task.finished
              ? "lightblue"
              : (dayjs(task.endDate).isBefore(dayjs()) &&
                  !dayjs().isSame(task.endDate, "d")) ||
                (dayjs(task.endDate).isBefore(dayjs()) &&
                  dayjs().isSame(task.endDate, "d") &&
                  !task.allDay)
              ? "rgb(244, 67, 54)"
              : task.priority.color,
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
