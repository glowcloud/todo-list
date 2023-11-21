import { Button, Box } from "@mui/material";
import { createEvents } from "ics";
import { getCalendarEvents } from "../../utils/calendarIntegrationUtils";

const DownloadButton = ({ tasks }) => {
  const handleDownload = async () => {
    const filename = "tasks.ics";
    const file = await new Promise((resolve, reject) => {
      createEvents(getCalendarEvents(tasks), (error, value) => {
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

  return (
    <Box textAlign="center" mt={4}>
      <Button onClick={handleDownload}>Download calendar</Button>
    </Box>
  );
};

export default DownloadButton;
