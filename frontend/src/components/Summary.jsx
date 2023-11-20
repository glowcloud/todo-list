import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "./TimeFrameSelect";
import { useDataContext } from "../context/DataContext";
import CustomPieChart from "./CustomPieChart";
import CustomBarChart from "./CustomBarChart";

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

const getPrioritiesDataset = (tasks, priorities, timeFrame, chosenTime) => {
  if (timeFrame === "week") {
    const dataset = [];
    for (let i = 0; i < 7; i++) {
      const day = dayjs(chosenTime).day(i);
      const dayTasks = tasks.filter(
        (task) =>
          dayjs(task.startDate).isSame(day, "d") ||
          dayjs(task.endDate).isSame(day, "d") ||
          (dayjs(task.startDate).isBefore(day) &&
            dayjs(task.endDate).isAfter(day))
      );
      const data = { time: day.format("ddd") };
      priorities.forEach((priority) => {
        data[priority.name] = dayTasks.filter(
          (task) => task.priority.id === priority.id
        ).length;
      });
      dataset.push(data);
    }
    return dataset;
  } else if (timeFrame === "year") {
    const dataset = [];
    for (let i = 0; i < 12; i++) {
      const month = dayjs(chosenTime).month(i);
      const monthTasks = tasks.filter(
        (task) =>
          dayjs(task.startDate).isSame(month, "month") ||
          dayjs(task.endDate).isSame(month, "month") ||
          (dayjs(task.startDate).isBefore(month) &&
            dayjs(task.endDate).isAfter(month))
      );
      const data = { time: month.format("MMM") };
      priorities.forEach((priority) => {
        data[priority.name] = monthTasks.filter(
          (task) => task.priority.id === priority.id
        ).length;
      });
      dataset.push(data);
    }
    return dataset;
  } else if (timeFrame === "month") {
    const dataset = [];
    const daysInMonth = dayjs(chosenTime).daysInMonth();
    for (let i = 0; i < daysInMonth; i++) {
      const day = dayjs(chosenTime).date(i + 1);
      const dayTasks = tasks.filter(
        (task) =>
          dayjs(task.startDate).isSame(day, "day") ||
          dayjs(task.endDate).isSame(day, "day") ||
          (dayjs(task.startDate).isBefore(day) &&
            dayjs(task.endDate).isAfter(day))
      );
      const data = { time: i + 1 };
      priorities.forEach((priority) => {
        data[priority.name] = dayTasks.filter(
          (task) => task.priority.id === priority.id
        ).length;
      });
      dataset.push(data);
    }
    return dataset;
  } else if (timeFrame === "day") {
    const day = dayjs(chosenTime);
    const dayTasks = tasks.filter(
      (task) =>
        dayjs(task.startDate).isSame(day, "day") ||
        dayjs(task.endDate).isSame(day, "day") ||
        (dayjs(task.startDate).isBefore(day) &&
          dayjs(task.endDate).isAfter(day))
    );
    const data = { time: chosenTime.format("DD/MM/YYYY") };
    priorities.forEach((priority) => {
      data[priority.name] = dayTasks.filter(
        (task) => task.priority.id === priority.id
      ).length;
    });
    return [data];
  } else {
    const data = { time: "Overall" };
    priorities.forEach((priority) => {
      data[priority.name] = tasks.filter(
        (task) => task.priority.id === priority.id
      ).length;
    });
    return [data];
  }
};

const Summary = () => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const { tasks, priorities } = useDataContext();

  return (
    <Box mt={{ xs: 5, md: 3 }}>
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
          <Divider flexItem sx={{ my: 3, mx: { xs: 1, md: 10 } }} />
          <Typography variant="h5" mt={2}>
            Number of tasks per task status
          </Typography>
          <CustomPieChart data={getStatusData(tasks, timeFrame, chosenTime)} />
          <Divider flexItem sx={{ my: 3, mx: { xs: 1, md: 10 } }} />
          <Typography variant="h5" mt={2}>
            Number of tasks per priority
          </Typography>
          {/* <CustomPieChart
            data={getPrioritiesData(tasks, priorities, timeFrame, chosenTime)}
          /> */}
          <CustomBarChart
            data={getPrioritiesDataset(
              tasks,
              priorities,
              timeFrame,
              chosenTime
            )}
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
