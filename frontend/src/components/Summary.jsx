import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "./TimeFrameSelect";
import { useDataContext } from "../context/DataContext";

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
    const currTasks = tasks.filter(
      (task) => task.priority.id === priority.id && !task.finished
    );
    data.push({
      id: priority.id,
      label: priority.name,
      value: currTasks.length,
      color: priority.color,
    });
  });

  const finishedTasks = tasks.filter((task) => task.finished);
  data.push({
    id: 6,
    label: "Finished",
    value: finishedTasks.length,
    color: "lightblue",
  });

  return data;
};

const Summary = () => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const { tasks, priorities } = useDataContext();

  return (
    <> 
      <TimeFrameSelect
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        chosenTime={chosenTime}
        setChosenTime={setChosenTime}
      />
      {getFilteredTasks(tasks, timeFrame, chosenTime).length > 0 ? (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          mx={{ xs: 1, md: 2, lg: 5, xl: 40 }}
        >
          <PieChart
            series={[
              {
                data: getStatusData(tasks, timeFrame, chosenTime),
                innerRadius: 0,
                outerRadius: 170,
                paddingAngle: 0,
                cornerRadius: 0,
                startAngle: 0,
                endAngle: 360,
              },
            ]}
            width={500}
            height={500}
          />
          <PieChart
            series={[
              {
                data: getPrioritiesData(
                  tasks,
                  priorities,
                  timeFrame,
                  chosenTime
                ),
                innerRadius: 0,
                outerRadius: 170,
                paddingAngle: 0,
                cornerRadius: 0,
                startAngle: 0,
                endAngle: 360,
              },
            ]}
            width={500}
            height={500}
          />
        </Box>
      ) : (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5">No tasks found.</Typography>
        </Box>
      )}
    </>
  );
};

export default Summary;
