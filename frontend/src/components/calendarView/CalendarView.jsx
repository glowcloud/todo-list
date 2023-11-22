import { Calendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import ConfirmDialog from "../shared/ConfirmDialog";
import ResendingBackdrop from "../shared/ResendingBackdrop";
import { useTheme } from "../../context/ThemeContext";
import { useDataContext } from "../../context/DataContext";
import TaskModal from "./TaskModal";
import DownloadButton from "./DownloadButton";
import { createEvents, getStyles } from "../../utils/calendarViewUtils";
import AddEditModal from "../shared/AddEditModal";

const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [changedTaskData, setChangedTaskData] = useState(null);
  const { mode } = useTheme();
  const { tasks, handleEditTask, setAlertMsg, setAlertType, loading } =
    useDataContext();
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleTaskClose = () => {
    setTaskOpen(-1);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

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

    await handleEditTask(currentTask);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };

  const onEventChange = async (data) => {
    if (tasks.find((task) => task.id === data.event.id).finished) {
      setAlertType("error");
      setAlertMsg("Can't edit finished tasks.");
    } else {
      setChangedTaskData(data);
      setIsConfirmOpen(true);
    }
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
        {...getStyles(mode)}
      />
      <DownloadButton tasks={tasks} />
      <TaskModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={taskOpen >= 0}
        handleModalClose={handleTaskClose}
        handleEditOpen={handleEditOpen}
      />
      <AddEditModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={isEditOpen}
        handleModalClose={handleEditClose}
        isEdit
      />
      <ConfirmDialog
        open={isConfirmOpen}
        handleClose={handleConfirmClose}
        handleConfirm={handleConfirmEdit}
        title="Confirm edit"
        content="Are you sure you want to reschedule this task?"
      />
      <ResendingBackdrop isResending={loading} />
    </>
  );
};

export default CalendarView;
