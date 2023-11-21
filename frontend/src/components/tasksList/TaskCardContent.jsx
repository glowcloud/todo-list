import { CardContent, Box, Typography } from "@mui/material";
import TaskChipStack from "../shared/TaskChipStack";
import FormattedDates from "../shared/FormattedDates";
import TaskCardMenu from "./TaskCardMenu";

const TaskCardContent = ({ task, handleEditOpen }) => {
  return (
    <CardContent
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <TaskChipStack task={task} />
        <Typography
          variant="h5"
          sx={{
            textDecoration: task.finished ? "line-through" : "none",
          }}
          gutterBottom
        >
          {task.title}
        </Typography>

        <FormattedDates
          startDate={task.startDate}
          endDate={task.endDate}
          allDay={task.allDay}
          finished={task.finished}
        />
      </Box>
      <TaskCardMenu task={task} handleEditOpen={handleEditOpen} />
    </CardContent>
  );
};

export default TaskCardContent;
