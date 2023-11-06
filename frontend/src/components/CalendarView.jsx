/* eslint-disable react/prop-types */
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import { useEffect, useState, useCallback } from "react";

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
      color: task.finished ? "lightblue" : task.priority.color,
    });
  });
  return events;
};

const CalendarView = ({ tasks, handleEditTask, setTaskOpen }) => {
  const [events, setEvents] = useState(createEvents(tasks));

  useEffect(() => {
    setEvents(createEvents(tasks));
  }, [tasks]);

  const onEventChange = async (data) => {
    // confirm prompt
    const currentTask = tasks.find((task) => task.id === data.event.id);
    currentTask.startDate = dayjs(data.start);
    currentTask.endDate = dayjs(data.end);
    await handleEditTask(currentTask);
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
      ...(dayjs().isSame(dayjs(date), "day") && {
        style: {
          //   backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
      }),
    }),
    []
  );

  return (
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
      style={{
        height: 500,
      }}
      sx={{
        mx: { xs: 1, md: 15, lg: 25, xl: 45 },
        my: 2,
      }}
    />
  );
};

export default CalendarView;
