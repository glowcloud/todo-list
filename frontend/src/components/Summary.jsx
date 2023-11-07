import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

const getStatusData = (tasks, timeFrame, chosenTime) => {
  if (timeFrame !== "overall") {
    tasks = tasks.filter((task) =>
      dayjs(chosenTime).isSame(dayjs(task.startDate), timeFrame)
    );
  }

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

  if (timeFrame !== "overall") {
    tasks = tasks.filter((task) =>
      dayjs(chosenTime).isSame(dayjs(task.startDate), timeFrame)
    );
  }

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

const Summary = ({ tasks, priorities }) => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [chosenTime, setChosenTime] = useState(dayjs());

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <>
      <Box textAlign="center" mt={5}>
        <FormControl sx={{ width: 150, mx: 2, my: { xs: 1, md: 0 } }}>
          <InputLabel>Timeframe</InputLabel>
          <Select value={timeFrame} onChange={handleTimeFrameChange}>
            <MenuItem value="overall">Overall</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="day">Day</MenuItem>
          </Select>
        </FormControl>
        {timeFrame !== "overall" && (
          <DatePicker
            label="Time"
            views={
              timeFrame === "year"
                ? ["year"]
                : timeFrame === "month"
                ? ["month", "year"]
                : ["day", "month", "year"]
            }
            value={chosenTime}
            onChange={(value) => setChosenTime(value)}
            sx={{ my: { xs: 1, md: 0 } }}
          />
        )}
      </Box>
      <Box display="flex">
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
              data: getPrioritiesData(tasks, priorities, timeFrame, chosenTime),
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
    </>
  );
};

export default Summary;
