import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "../shared/TimeFrameSelect";
import ResendingBackdrop from "../shared/ResendingBackdrop";
import { useDataContext } from "../../context/DataContext";
import { getFilteredTasks } from "../../utils/generalUtils";
import SortFilterSearch from "./SortFilterSearch";
import TasksProgress from "./TasksProgress";
import NoTasksMsg from "../shared/NoTasksMsg";
import TasksListPagination from "./TasksListPagination";
import TasksListMasonry from "./TasksListMasonry";

const TasksList = ({ overdue }) => {
  const [sortType, setSortType] = useState("none");
  const [timeFrame, setTimeFrame] = useState(overdue ? "overall" : "day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const [search, setSearch] = useState("");
  const [priorityFilters, setPriorityFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filteredFinishedTasks, setFilteredFinishedTasks] = useState([]);
  const { tasks, loading } = useDataContext();

  useEffect(() => {
    setPage(1);
    setFilteredTasks(
      getFilteredTasks(
        tasks,
        timeFrame,
        chosenTime,
        priorityFilters,
        sortType,
        search,
        overdue,
        false
      )
    );
    setFilteredFinishedTasks(
      getFilteredTasks(
        tasks,
        timeFrame,
        chosenTime,
        priorityFilters,
        sortType,
        search,
        overdue,
        true
      )
    );
  }, [
    tasks,
    priorityFilters,
    search,
    timeFrame,
    sortType,
    chosenTime,
    overdue,
  ]);

  const handleChangePage = (e, v) => {
    setPage(v);
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
    <>
      <Box
        sx={{
          mx: { sm: 2, md: 15, lg: 35, xl: 60 },
          mt: { xs: 5, md: 0 },
        }}
      >
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
      </Box>
      {(filteredTasks.length > 0 || filteredFinishedTasks.length > 0) && (
        <>
          {!overdue && (
            <TasksProgress
              value={
                (filteredFinishedTasks.length /
                  (filteredTasks.length + filteredFinishedTasks.length)) *
                100
              }
            />
          )}
          <TasksListMasonry
            tasks={filteredTasks.concat(filteredFinishedTasks)}
            page={page}
          />
          <TasksListPagination
            tasks={filteredTasks.concat(filteredFinishedTasks)}
            page={page}
            handleChangePage={handleChangePage}
          />
        </>
      )}
      {(!tasks ||
        tasks.length === 0 ||
        (filteredTasks.length === 0 && filteredFinishedTasks.length === 0)) && (
        <NoTasksMsg />
      )}
      <ResendingBackdrop isResending={loading} />
    </>
  );
};

export default TasksList;
