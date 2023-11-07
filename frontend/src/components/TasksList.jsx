/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import TaskCard from "./TaskCard";
import SortPopover from "./SortPopover";
import { useState } from "react";
import dayjs from "dayjs";

const TasksList = ({
  tasks,
  priorityFilters,
  setTaskOpen,
  handleCheckTask,
  priorities,
  search,
}) => {
  const [sortType, setSortType] = useState("none");

  return (
    <Box sx={{ mx: { md: 15, lg: 25, xl: 45 } }}>
      <SortPopover sortType={sortType} setSortType={setSortType} />
      {tasks
        .filter(
          (task) =>
            (task.title.includes(search) ||
              task.description.includes(search)) &&
            (priorityFilters.length === 0 ||
              priorityFilters.includes(task.priority.id))
        )
        .sort((x, y) => {
          if (sortType === "none") {
            return x.finished - y.finished;
          }
          if (sortType === "priority") {
            return x.priority.id - y.priority.id;
          }
          if (sortType === "date") {
            return dayjs(x.endDate).toDate() - dayjs(y.endDate).toDate();
          }
        })
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
