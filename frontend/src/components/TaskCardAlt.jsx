import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import { isOverdue } from "../utils/generalUtils";
import { useDataContext } from "../context/DataContext";
import {
  CheckCircle,
  CheckCircleOutline,
  Edit,
  Delete,
  Email,
  ExpandMore,
  MoreVert,
} from "@mui/icons-material";
import { useState } from "react";

const getFormattedDates = (startDate, endDate, allDay) => {
  if (dayjs(startDate).isSame(dayjs(endDate), "d")) {
    if (allDay) {
      return (
        <>
          <Typography variant="body2">
            on {dayjs(startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            all day
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="body2">
            on {dayjs(startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            from {dayjs(startDate).format("h:mm A")} to{" "}
            {dayjs(endDate).format("h:mm A")}
          </Typography>
        </>
      );
    }
  }
  if (allDay) {
    return (
      <>
        <Typography variant="body2">
          from {dayjs(startDate).format("DD/MM/YYYY")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          to {dayjs(endDate).format("DD/MM/YYYY")}
        </Typography>
      </>
    );
  }
  return (
    <>
      <Typography variant="body2">
        from {dayjs(startDate).format("h:mm A DD/MM/YYYY")}
      </Typography>
      <Typography variant="body2" gutterBottom>
        to {dayjs(endDate).format("h:mm A DD/MM/YYYY")}
      </Typography>
    </>
  );
};

const TaskCardAlt = ({ task, handleClick, handleCheckTask }) => {
  const [expanded, setExpanded] = useState(false);

  const handleCheck = async (e) => {
    await handleCheckTask(task.id, e.target.checked);
  };

  const handleExpandedClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        m: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            color={
              task?.finished
                ? "primary.main"
                : isOverdue(task)
                ? "rgb(244, 67, 54)"
                : "secondary"
            }
            variant="body2"
          >
            {task?.finished
              ? "Finished"
              : isOverdue(task)
              ? "Overdue"
              : "To Do"}
          </Typography>
          {
            <Typography
              color={
                task
                  ? task.finished
                    ? "primary.main"
                    : task.priority.color
                  : ""
              }
              variant="body2"
              gutterBottom
            >
              {task && task.priority.name} priority
            </Typography>
          }
          <Typography
            variant="h5"
            sx={{
              textDecoration: task.finished ? "line-through" : "none",
              width: 330,
            }}
            gutterBottom
          >
            {task.title}
          </Typography>
          {getFormattedDates(task.startDate, task.endDate, task.allDay)}
        </Box>
        <IconButton>
          <MoreVert />
        </IconButton>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleCheck}>
          {task?.finished ? <CheckCircle /> : <CheckCircleOutline />}
        </IconButton>
        {!task?.finished && (
          <IconButton>
            <Email />
          </IconButton>
        )}
        {!task?.finished && (
          <IconButton>
            <Edit />
          </IconButton>
        )}
        <IconButton>
          <Delete />
        </IconButton>
        {task?.description && (
          <IconButton onClick={handleExpandedClick} sx={{ marginLeft: "auto" }}>
            <ExpandMore />
          </IconButton>
        )}
      </CardActions>
      {task?.description && (
        <Collapse in={expanded}>
          <CardContent>
            <Typography paragraph sx={{ width: 330 }}>
              {task?.description}
            </Typography>
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
};

export default TaskCardAlt;
