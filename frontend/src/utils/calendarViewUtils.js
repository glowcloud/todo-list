import dayjs from "dayjs";
import { getColor } from "./generalUtils";

const createEvents = (tasks) => {
  const events = [];
  tasks.forEach((task) => {
    events.push({
      id: task.id,
      title: task.title,
      start: dayjs(task.startDate).toDate(),
      end: dayjs(task.endDate).toDate(),
      allDay: task.allDay,
      color: task.finished
        ? getColor("Finished")
        : getColor(task.priority.name),
    });
  });
  return events;
};

const getStyles = (mode) => {
  return {
    sx: {
      height: { xs: 625, sm: 625, md: 675, lg: 700, xl: 750 },
      mx: { xs: 1, sm: 2, md: 5, lg: 10, xl: 25 },
      my: 2,
      mt: { xs: 5, md: 0 },
      ".rbc-current-time-indicator": {
        backgroundColor: "red",
        height: 2
      },
      ".rbc-event-label": {
        color: "white",
      },
      ".rbc-event": {
        filter: "grayscale(20%)",
      },
      ".rbc-event-content": {
        color: "white",
      },
      ".rbc-month-view": {
        borderColor: "#aaa",
      },
      ".rbc-row": {
        borderColor: "#aaa",
      },
      ".rbc-month-row": {
        borderColor: "#aaa",
      },
      ".rbc-time-view": {
        borderColor: "#aaa",
      },
      ".rbc-time-header": {
        borderColor: "#aaa",
      },
      ".rbc-time-content": {
        borderColor: "#aaa",
      },
      ".rbc-day-slot": {
        borderColor: "#aaa",
      },
      ".rbc-time-slot": {
        borderColor: "#aaa",
        border: "none",
      },
      ".rbc-show-more": {
        color: mode === "dark" ? "#ddd" : "",
        backgroundColor: mode === "dark" ? "#121212" : "",
      },
      ".rbc-toolbar": {
        flexDirection: { xs: "column-reverse", md: "row" },
      },
      ".rbc-toolbar-label": {
        my: { xs: 1, md: 0 },
      },
      ".rbc-toolbar button": {
        color: mode === "dark" ? "white" : "black",
      },
      ".rbc-toolbar button:hover, .rbc-toolbar button:active, .rbc-toolbar button:focus":
        {
          backgroundColor: "#e6e6e6",
          color: "black",
        },
      ".rbc-active": {
        color: "black !important",
      },
      ".rbc-off-range-bg": {
        backgroundColor: mode === "dark" ? "#282828" : "",
      },
    },
  };
};

export { createEvents, getStyles };
