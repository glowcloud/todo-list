import { Box, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "./TimeFrameSelect";
import ResendingBackdrop from "./ResendingBackdrop";
import { useDataContext } from "../context/DataContext";
import { getFilteredTasks } from "../utils/generalUtils";
import SortFilterSearch from "./SortFilterSearch";
import TasksProgress from "./TasksProgress";
import TaskCardAlt from "./TaskCardAlt";
import { Masonry } from "@mui/lab";

const paginate = (tasks, page) => {
  return tasks.slice((page - 1) * 9, page * 9);
};

const TasksList = ({ setTaskOpen, overdue }) => {
  const [sortType, setSortType] = useState("none");
  const [timeFrame, setTimeFrame] = useState(overdue ? "overall" : "day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const [search, setSearch] = useState("");
  const [priorityFilters, setPriorityFilters] = useState([]);
  const [page, setPage] = useState(1);
  const { tasks, priorities, loading, handleCheckTask } = useDataContext();

  const handleChangePage = (e, v) => {
    setPage(v);
  };

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
      </Box>
      {/* <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          mx: { sm: 2, md: 10 },
          mt: { xs: 5, md: 2 },
          mb: 2,
        }}
      >
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
          <TaskCardAlt
            key={task.id}
            task={task}
            handleClick={() => setTaskOpen(task.id)}
            handleCheckTask={handleCheck}
            priorities={priorities}
          />
        ))}
      </Box> */}
      <Box
        sx={{
          mx: { sm: 2, md: 10 },
          mt: { xs: 5, md: 2 },
          mb: 2,
        }}
      >
        <Masonry columns={{ xs: 1, md: 2, lg: 3 }}>
          {paginate(
            getFilteredTasks(
              tasks,
              timeFrame,
              chosenTime,
              priorityFilters,
              sortType,
              search,
              overdue,
              false
            ).map((task) => (
              <TaskCardAlt
                key={task.id}
                task={task}
                handleClick={() => setTaskOpen(task.id)}
                handleCheckTask={handleCheck}
                priorities={priorities}
              />
            )),
            page
          )}
        </Masonry>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 4,
        }}
      >
        <Pagination
          count={Math.ceil(
            getFilteredTasks(
              tasks,
              timeFrame,
              chosenTime,
              priorityFilters,
              sortType,
              search,
              overdue,
              false
            ).length / 9
          )}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
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
    </>
  );
};

export default TasksList;
