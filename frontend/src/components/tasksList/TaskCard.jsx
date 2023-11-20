import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
  Box,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import { isOverdue } from "../../utils/generalUtils";
import { useDataContext } from "../../context/DataContext";
import {
  CheckCircle,
  CheckCircleOutline,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import TaskCardMenu from "./TaskCardMenu";
import EditModal from "../shared/EditModal";

const getFormattedDates = (startDate, endDate, allDay, finished) => {
  if (dayjs(startDate).isSame(dayjs(endDate), "d")) {
    if (allDay) {
      return (
        <>
          <Typography
            variant="body2"
            sx={{
              textDecoration: finished ? "line-through" : "none",
            }}
          >
            on {dayjs(startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              textDecoration: finished ? "line-through" : "none",
            }}
          >
            all day
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography
            variant="body2"
            sx={{
              textDecoration: finished ? "line-through" : "none",
            }}
          >
            on {dayjs(startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              textDecoration: finished ? "line-through" : "none",
            }}
          >
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
        <Typography
          variant="body2"
          sx={{
            textDecoration: finished ? "line-through" : "none",
          }}
        >
          from {dayjs(startDate).format("DD/MM/YYYY")}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            textDecoration: finished ? "line-through" : "none",
          }}
        >
          to {dayjs(endDate).format("DD/MM/YYYY")}
        </Typography>
      </>
    );
  }
  return (
    <>
      <Typography
        variant="body2"
        sx={{
          textDecoration: finished ? "line-through" : "none",
        }}
      >
        from {dayjs(startDate).format("h:mm A DD/MM/YYYY")}
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          textDecoration: finished ? "line-through" : "none",
        }}
      >
        to {dayjs(endDate).format("h:mm A DD/MM/YYYY")}
      </Typography>
    </>
  );
};

const TaskCard = ({ task }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { handleCheckTask } = useDataContext();

  const handleCheck = async () => {
    await handleCheckTask(task.id, !task.finished);
  };

  const handleExpandedClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  return (
    <>
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
              }}
              gutterBottom
            >
              {task.title}
            </Typography>
            {getFormattedDates(
              task.startDate,
              task.endDate,
              task.allDay,
              task.finished
            )}
          </Box>
          <TaskCardMenu task={task} handleEditOpen={handleEditOpen} />
        </CardContent>
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
        {task?.description && (
          <Collapse in={expanded}>
            <CardContent>
              <Divider sx={{ mb: 2 }} />
              <Typography paragraph>{task?.description}</Typography>
            </CardContent>
          </Collapse>
        )}
      </Card>
      <EditModal
        task={task}
        isOpen={isEditOpen}
        handleModalClose={handleEditClose}
      />
    </>
  );
};

export default TaskCard;
