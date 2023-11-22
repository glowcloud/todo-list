import dayjs from "dayjs";

const isOverdue = (task) => {
  if (task) {
    return (
      !task.finished &&
      ((dayjs(task.endDate).isBefore(dayjs()) &&
        !dayjs().isSame(task.endDate, "d")) ||
        (dayjs(task.endDate).isBefore(dayjs()) &&
          dayjs().isSame(task.endDate, "d") &&
          !task.allDay))
    );
  }
  return false;
};

const getFilteredTasks = (
  tasks,
  timeFrame,
  chosenTime,
  priorityFilters,
  sortType,
  search,
  overdue,
  finished
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
        (task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())) &&
        (priorityFilters.length === 0 ||
          priorityFilters.includes(task.priority.id)) &&
        (finished ? task.finished : !task.finished)
      // (!finished || task.finished)
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

const getColor = (text) => {
  switch (text) {
    case "To Do":
      return "#66bb6a";
    // return "success.main";
    case "Overdue":
      return "#f44336";
    // return "error.main";
    case "Finished":
      // return "primary.main";
      return "#90caf9";
    case "Lowest":
    case "Lowest priority":
      return "rgb(3, 169, 244)";
    case "Low":
    case "Low priority":
      return "rgb(0, 150, 136)";
    case "Moderate":
    case "Moderate priority":
      return "rgb(76, 175, 80)";
    case "High":
    case "High priority":
      return "rgb(255, 160, 0)";
    case "Highest":
    case "Highest priority":
      return "rgb(255, 87, 34)";
    default:
      return "";
  }
};

export { isOverdue, getFilteredTasks, getColor };
