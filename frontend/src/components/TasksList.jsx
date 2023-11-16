import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "./TimeFrameSelect";
import ResendingBackdrop from "./ResendingBackdrop";
import { useDataContext } from "../context/DataContext";
import { isOverdue } from "../utils/generalUtils";
import SortFilterSearch from "./SortFilterSearch";

const getFilteredTasks = (
  tasks,
  timeFrame,
  chosenTime,
  priorityFilters,
  sortType,
  search,
  overdue
) => {
  return tasks
    .filter(
      (task) =>
        (!overdue || isOverdue(task)) &&
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

const TasksList = ({ setTaskOpen, overdue }) => {
  const [sortType, setSortType] = useState("none");
  const [timeFrame, setTimeFrame] = useState(overdue ? "overall" : "day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const [isResending, setIsResending] = useState(false);
  const [search, setSearch] = useState("");
  const [priorityFilters, setPriorityFilters] = useState([]);
  const { tasks, priorities, handleCheckTask } = useDataContext();

  const handleCheck = async (id, isChecked) => {
    if (isChecked) {
      await handleCheckTask(id, isChecked);
    } else {
      setIsResending(true);
      await handleCheckTask(id, isChecked);
      setIsResending(false);
    }
  };

  const handleFilterClick = (id) => {
    setPriorityFilters((prevFilters) => {
      if (prevFilters.includes(id))
        return prevFilters.filter((item) => item !== id);
      else {
        return [...prevFilters, id];
      }
    });
  };

  return (
    <Box sx={{ mx: { md: 15, lg: 35, xl: 60 } }}>
      <SortFilterSearch
        sortType={sortType}
        setSortType={setSortType}
        search={search}
        setSearch={setSearch}
        handleFilterClick={handleFilterClick}
        priorityFilters={priorityFilters}
        setPriorityFilters={setPriorityFilters}
      />
      {!overdue && (
        <Box
          mb={3}
          mx={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TimeFrameSelect
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
            chosenTime={chosenTime}
            setChosenTime={setChosenTime}
          />
        </Box>
      )}
      {getFilteredTasks(
        tasks,
        timeFrame,
        chosenTime,
        priorityFilters,
        sortType,
        search,
        overdue
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
      <ResendingBackdrop isResending={isResending} />
    </Box>
  );
};

export default TasksList;
