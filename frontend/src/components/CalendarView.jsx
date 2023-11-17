import { Calendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { isOverdue } from "../utils/generalUtils";
import ConfirmDialog from "./ConfirmDialog";
import ResendingBackdrop from "./ResendingBackdrop";
import { useTheme } from "../context/ThemeContext";
import { useDataContext } from "../context/DataContext";

const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar);

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
        ? "lightblue"
        : isOverdue(task)
        ? "rgb(244, 67, 54)"
        : task.priority.color,
    });
  });
  return events;
};

const CalendarView = ({ setTaskOpen }) => {
  const [events, setEvents] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [changedTaskData, setChangedTaskData] = useState(null);
  const { mode } = useTheme();
  const { tasks, handleEditTask } = useDataContext();

  useEffect(() => {
    if (tasks) {
      setEvents(createEvents(tasks));
    }
  }, [tasks]);

  const handleConfirmEdit = async () => {
    const currentTask = tasks.find(
      (task) => task.id === changedTaskData.event.id
    );
    currentTask.startDate = dayjs(changedTaskData.start);
    currentTask.endDate = dayjs(changedTaskData.end);
    handleConfirmClose();

    setIsResending(true);
    await handleEditTask(currentTask);
    setIsResending(false);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };

  const onEventChange = async (data) => {
    setChangedTaskData(data);
    setIsConfirmOpen(true);
  };

  const onEventClick = (event) => {
    setTaskOpen(event.id);
  };

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.color && {
        style: {
          backgroundColor: event.color,
          color: "black",
        },
      }),
    }),
    []
  );

  const dayPropGetter = useCallback(
    (date) => ({
      ...(dayjs().isSame(dayjs(date), "day") &&
        mode === "dark" && {
          style: {
            backgroundColor: "#282828",
          },
        }),
    }),
    [mode]
  );

  return (
    <>
      <Box
        component={DnDCalendar}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onEventDrop={onEventChange}
        onEventResize={onEventChange}
        onSelectEvent={onEventClick}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        views={["month", "week", "day"]}
        sx={{
          height: { xs: 625, sm: 625, md: 675, lg: 700, xl: 750 },
          mx: { xs: 1, sm: 2, md: 5, lg: 15, xl: 35 },
          my: 2,
          mt: { xs: 5, md: 0 },
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
        }}
      />
      <ConfirmDialog
        open={isConfirmOpen}
        handleClose={handleConfirmClose}
        handleConfirm={handleConfirmEdit}
        title="Confirm edit"
        content="Are you sure you want to reschedule this task?"
      />
      <ResendingBackdrop isResending={isResending} />
    </>
  );
};

export default CalendarView;
