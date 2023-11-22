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
      // return "#6eb272";
      return "#66bb6a";
    case "Overdue":
      // return "#e15349";
      return "#f44336";
    case "Finished":
      // return "#9ac9ee";
      return "#90caf9";
    case "Lowest":
    case "Lowest priority":
      // return "#1ba0dc";
      return "rgb(3, 169, 244)";
    case "Low":
    case "Low priority":
      // return "#0f877c";
      return "rgb(0, 150, 136)";
    case "Moderate":
    case "Moderate priority":
      // return "#56a559";
      return "rgb(76, 175, 80)";
    case "High":
    case "High priority":
      // return "#e69a19";
      return "rgb(255, 160, 0)";
    case "Highest":
    case "Highest priority":
      // return "#e96238";
      return "rgb(255, 87, 34)";
    default:
      return "";
  }
};

const isEmail = (email) => {
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(email);
};

export { isOverdue, getFilteredTasks, getColor, isEmail };
