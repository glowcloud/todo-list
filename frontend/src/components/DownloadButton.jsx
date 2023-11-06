import { Button } from "@mui/material";
import dayjs from "dayjs";
import { createEvents } from "ics";

const getEvents = (tasks) => {
  const events = [];
  tasks.forEach((task) => {
    const start = dayjs(task.startDate)
      .format("YYYY-M-D-H-m")
      .split("-")
      .map((start) => +start);
    const end = dayjs(task.endDate)
      .format("YYYY-M-D-H-m")
      .split("-")
      .map((end) => +end);
    events.push({
      title: task.title,
      description: task.description,
      start,
      end,
    });
  });
  console.log(events);
  return events;
};

const DownloadButton = ({ tasks }) => {
  const handleDownload = async () => {
    const filename = "tasks.ics";
    const file = await new Promise((resolve, reject) => {
      createEvents(getEvents(tasks), (error, value) => {
        if (error) {
          reject(error);
        }

        resolve(new File([value], filename, { type: "text/calendar" }));
      });
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleDownload}>Download calendar</Button>;
};

export default DownloadButton;
