/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import TaskCard from "./TaskCard";

const TasksList = ({
  tasks,
  priorityFilters,
  setTaskOpen,
  handleCheckTask,
  priorities,
  search,
}) => {
  return (
    <Box sx={{ mx: { md: 15, lg: 25, xl: 45 } }}>
      {tasks
        .filter(
          (task) =>
            (task.title.includes(search) ||
              task.description.includes(search)) &&
            (priorityFilters.length === 0 ||
              priorityFilters.includes(task.priority.id))
        )
        .sort((x, y) => x.finished - y.finished)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleClick={() => setTaskOpen(task.id)}
            handleCheckTask={handleCheckTask}
            priorities={priorities}
          />
        ))}
    </Box>
  );
};

export default TasksList;
