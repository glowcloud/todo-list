import { Box, Typography } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "./TimeFrameSelect";
import { useDataContext } from "../context/DataContext";
import CustomPieChart from "./CustomPieChart";

const getFilteredTasks = (tasks, timeFrame, chosenTime) => {
  if (timeFrame !== "overall") {
    return tasks.filter(
      (task) =>
        dayjs(chosenTime).isSame(dayjs(task.startDate), timeFrame) ||
        dayjs(chosenTime).isSame(dayjs(task.endDate), timeFrame) ||
        (dayjs(task.startDate).isBefore(dayjs(chosenTime), timeFrame) &&
          dayjs(task.endDate).isAfter(dayjs(chosenTime), timeFrame))
    );
  } else return tasks;
};

const getStatusData = (tasks, timeFrame, chosenTime) => {
  tasks = getFilteredTasks(tasks, timeFrame, chosenTime);

  let done = 0;
  let todo = 0;
  let overdue = 0;

  tasks.forEach((task) => {
    if (task.finished) done++;
    else if (
      dayjs(task.endDate).isBefore(dayjs()) ||
      (dayjs().isSame(task.endDate, "d") && !task.allDay)
    )
      overdue++;
    else todo++;
  });

  return [
    {
      id: 0,
      value: done,
      label: "Finished",
    },
    {
      id: 1,
      value: todo,
      label: "To do",
    },
    {
      id: 2,
      value: overdue,
      label: "Overdue",
      color: "rgb(244, 67, 54)",
    },
  ];
};

const getPrioritiesData = (tasks, priorities, timeFrame, chosenTime) => {
  const data = [];
  tasks = getFilteredTasks(tasks, timeFrame, chosenTime);

  priorities.forEach((priority) => {
    const currTasks = tasks.filter((task) => task.priority.id === priority.id);
    data.push({
      id: priority.id,
      label: priority.name,
      value: currTasks.length,
      color: priority.color,
    });
  });

  return data;
};

const Summary = () => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const { tasks, priorities } = useDataContext();

  return (
    <Box mt={3}>
      <TimeFrameSelect
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        chosenTime={chosenTime}
        setChosenTime={setChosenTime}
      />
      {getFilteredTasks(tasks, timeFrame, chosenTime).length > 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mx={{ xs: 1, md: 2, lg: 5, xl: 40 }}
          mt={3}
        >
          <CustomPieChart data={getStatusData(tasks, timeFrame, chosenTime)} />
          <CustomPieChart
            data={getPrioritiesData(tasks, priorities, timeFrame, chosenTime)}
          />
        </Box>
      ) : (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5">No tasks found.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Summary;
