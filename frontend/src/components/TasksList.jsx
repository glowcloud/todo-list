import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "./TimeFrameSelect";
import ResendingBackdrop from "./ResendingBackdrop";
import { useDataContext } from "../context/DataContext";
import { getFilteredTasks } from "../utils/generalUtils";
import SortFilterSearch from "./SortFilterSearch";
import TasksProgress from "./TasksProgress";

const TasksList = ({ setTaskOpen, overdue }) => {
  const [sortType, setSortType] = useState("none");
  const [timeFrame, setTimeFrame] = useState(overdue ? "overall" : "day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const [search, setSearch] = useState("");
  const [priorityFilters, setPriorityFilters] = useState([]);
  const { tasks, priorities, loading, handleCheckTask } = useDataContext();

  const handleCheck = async (id, isChecked) => {
    await handleCheckTask(id, isChecked);
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
      {!overdue && (
        <TasksProgress
          value={
            (getFilteredTasks(
              tasks,
              timeFrame,
              chosenTime,
              priorityFilters,
              sortType,
              search,
              overdue,
              true
            ).length /
              getFilteredTasks(
                tasks,
                timeFrame,
                chosenTime,
                priorityFilters,
                sortType,
                search,
                overdue,
                false
              ).length) *
            100
          }
        />
      )}
      {getFilteredTasks(
        tasks,
        timeFrame,
        chosenTime,
        priorityFilters,
        sortType,
        search,
        overdue,
        false
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
          search,
          overdue,
          false
        ).length === 0) && (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5">No tasks found.</Typography>
        </Box>
      )}
      <ResendingBackdrop isResending={loading} />
    </Box>
  );
};

export default TasksList;
