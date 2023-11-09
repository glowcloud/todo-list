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

export { isOverdue };
