/* eslint-disable react/prop-types */
import { Box, Typography, Backdrop, CircularProgress } from "@mui/material";
import TaskCard from "./TaskCard";
import SortPopover from "./SortPopover";
import { useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "./TimeFrameSelect";

const getFilteredTasks = (
  tasks,
  timeFrame,
  chosenTime,
  priorityFilters,
  sortType,
  search
) => {
  return tasks
    .filter(
      (task) =>
        (timeFrame === "overall" ||
          dayjs(chosenTime).isSame(dayjs(task.startDate), timeFrame) ||
          dayjs(chosenTime).isSame(dayjs(task.endDate), timeFrame) ||
          (dayjs(task.startDate).isBefore(dayjs(chosenTime), timeFrame) &&
            dayjs(task.endDate).isAfter(dayjs(chosenTime), timeFrame))) &&
        (task.title.includes(search) || task.description.includes(search)) &&
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
    });
};

const TasksList = ({
  tasks,
  priorityFilters,
  setTaskOpen,
  handleCheckTask,
  priorities,
  search,
}) => {
  const [sortType, setSortType] = useState("none");
  const [timeFrame, setTimeFrame] = useState("day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const [isResending, setIsResending] = useState(false);

  const handleCheck = async (id, isChecked) => {
    if (isChecked) {
      await handleCheckTask(id, isChecked);
    } else {
      setIsResending(true);
      await handleCheckTask(id, isChecked);
      setIsResending(false);
    }
  };

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
      {getFilteredTasks(
        tasks,
        timeFrame,
        chosenTime,
        priorityFilters,
        sortType,
        search
      ).map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleClick={() => setTaskOpen(task.id)}
          handleCheckTask={handleCheck}
          priorities={priorities}
        />
      ))}
      {(!tasks ||
        tasks.length === 0 ||
        getFilteredTasks(
          tasks,
          timeFrame,
          chosenTime,
          priorityFilters,
          sortType,
          search
        ).length === 0) && (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5">No tasks found.</Typography>
        </Box>
      )}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        }}
        open={isResending}
      >
        <Typography variant="h6" sx={{ mb: 3 }} gutterBottom>
          Resending task...
        </Typography>

        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default TasksList;
