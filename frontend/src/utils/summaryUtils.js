import dayjs from "dayjs";
import { getColor, isOverdue } from "./generalUtils";

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
    else if (isOverdue(task)) overdue++;
    else todo++;
  });

  return [
    {
      id: 0,
      value: done,
      label: "Finished",
      color: getColor("Finished"),
    },
    {
      id: 1,
      value: todo,
      label: "To do",
      color: getColor("To Do"),
    },
    {
      id: 2,
      value: overdue,
      label: "Overdue",
      color: getColor("Overdue"),
    },
  ];
};

const getPrioritiesDataset = (tasks, priorities, timeFrame, chosenTime) => {
  if (timeFrame === "week") {
    const dataset = [];
    for (let i = 0; i < 7; i++) {
      const day = dayjs(chosenTime).day(i);
      const dayTasks = getFilteredTasks(tasks, "day", day);
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
      const monthTasks = getFilteredTasks(tasks, "month", month);
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
      const dayTasks = getFilteredTasks(tasks, "day", day);
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
    const dayTasks = getFilteredTasks(tasks, "day", day);
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

export { getFilteredTasks, getStatusData, getPrioritiesDataset };
