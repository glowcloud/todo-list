/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import TaskCard from "./TaskCard";
import SortPopover from "./SortPopover";
import { useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "./TimeFrameSelect";

const TasksList = ({
  tasks,
  priorityFilters,
  setTaskOpen,
  handleCheckTask,
  priorities,
  search,
}) => {
  const [sortType, setSortType] = useState("none");
  const [timeFrame, setTimeFrame] = useState("overall");
  const [chosenTime, setChosenTime] = useState(dayjs());

  return (
    <Box sx={{ mx: { md: 15, lg: 25, xl: 45 } }}>
      <Box
        mb={3}
        mx={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SortPopover sortType={sortType} setSortType={setSortType} />
        <TimeFrameSelect
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          chosenTime={chosenTime}
          setChosenTime={setChosenTime}
        />
      </Box>
      {tasks
        .filter(
          (task) =>
            (timeFrame === "overall" ||
              dayjs(chosenTime).isSame(dayjs(task.startDate), timeFrame) ||
              dayjs(chosenTime).isSame(dayjs(task.endDate), timeFrame) ||
              (dayjs(task.startDate).isBefore(dayjs(chosenTime), timeFrame) &&
                dayjs(task.endDate).isAfter(dayjs(chosenTime), timeFrame))) &&
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
