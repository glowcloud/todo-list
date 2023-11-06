import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import dayjs from "dayjs";

const getData = (tasks, priorities, timeFrame) => {
  if (timeFrame !== "overall") {
    tasks = tasks.filter((task) =>
      dayjs().isSame(dayjs(task.startDate), timeFrame)
    );
  }
  let done = 0;
  let todo = 0;
  tasks.forEach((task) => {
    task.finished ? done++ : todo++;
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
  ];
};

const getPrioritiesData = (tasks, priorities, timeFrame) => {
  const data = [];

  if (timeFrame !== "overall") {
    tasks = tasks.filter((task) =>
      dayjs().isSame(dayjs(task.startDate), timeFrame)
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

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <>
      <Box textAlign="center" mt={5}>
        <FormControl sx={{ width: 500 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select value={timeFrame} onChange={handleTimeFrameChange}>
            <MenuItem value="overall">Overall</MenuItem>
            <MenuItem value="year">This year</MenuItem>
            <MenuItem value="month">This month</MenuItem>
            <MenuItem value="week">This week</MenuItem>
            <MenuItem value="day">This day</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex">
        <PieChart
          series={[
            {
              data: getData(tasks, priorities, timeFrame),
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
              data: getPrioritiesData(tasks, priorities, timeFrame),
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
