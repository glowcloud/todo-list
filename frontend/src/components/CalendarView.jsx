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

const CalendarView = ({ search, priorityFilters, setTaskOpen }) => {
  const [events, setEvents] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [changedTaskData, setChangedTaskData] = useState(null);
  const { mode } = useTheme();
  const { tasks, handleEditTask } = useDataContext();

  useEffect(() => {
    if (tasks) {
      setEvents(
        createEvents(
          tasks.filter(
            (task) =>
              (task.title.includes(search) ||
                task.description.includes(search)) &&
              (priorityFilters.length === 0 ||
                priorityFilters.includes(task.priority.id))
          )
        )
      );
    }
  }, [tasks, search, priorityFilters]);

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
      ...(!dayjs().isSame(dayjs(date), "month") &&
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
        defaultView="day"
        views={["month", "week", "day"]}
        sx={{
          height: { xs: 600, sm: 625, md: 675 },
          mx: { xs: 1, sm: 2, md: 10, lg: 15, xl: 35 },
          my: 2,
          ".rbc-toolbar": {
            flexDirection: { xs: "column-reverse", md: "row" },
          },
          ".rbc-toolbar-label": {
            my: { xs: 1, md: 0 },
          },
          ".rbc-toolbar button": {
            color: mode === "dark" ? "white" : "black",
          },
          ".rbc-active": {
            color: "black !important",
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
