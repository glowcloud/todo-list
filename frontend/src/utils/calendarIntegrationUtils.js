import { createEvent } from "ics";
import dayjs from "dayjs";

const getCalendarEvent = (task) => {
  const start = dayjs(task.startDate)
    .format("YYYY-M-D-H-m")
    .split("-")
    .map((start) => +start);
  const end = dayjs(task.endDate)
    .format("YYYY-M-D-H-m")
    .split("-")
    .map((end) => +end);
  if (task.allDay) {
    start[3] = 0;
    start[4] = 0;
    end[3] = 23;
    end[4] = 59;
  }
  return {
    title: task.title,
    description: task.description,
    start,
    end,
  };
};

const sendTask = async (task) => {
  const filename = "tasks.ics";
  const file = await new Promise((resolve, reject) => {
    createEvent(getCalendarEvent(task), (error, value) => {
      if (error) {
        reject(error);
      }

      resolve(new File([value], filename, { type: "text/calendar" }));
    });
  });

  await fetch("http://localhost:8080/sendmail", {
    method: "POST",
    body: file,
    headers: { "Content-Type": "text/calendar" },
  });
};

export { sendTask };
