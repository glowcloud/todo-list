import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TimeFrameSelect from "../shared/TimeFrameSelect";
import { useDataContext } from "../../context/DataContext";
import CustomPieChart from "./CustomPieChart";
import CustomBarChart from "./CustomBarChart";
import {
  getFilteredTasks,
  getStatusData,
  getPrioritiesDataset,
} from "../../utils/summaryUtils";

const Summary = () => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [chosenTime, setChosenTime] = useState(dayjs());
  const { tasks, priorities } = useDataContext();

  useEffect(() => {
    setChosenTime(dayjs());
  }, [timeFrame]);

  return (
    <Box mt={{ xs: 5, md: 3 }}>
      <TimeFrameSelect
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        chosenTime={chosenTime}
        setChosenTime={setChosenTime}
      />
      {getFilteredTasks(tasks, timeFrame, chosenTime).length > 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mx={{ xs: 1, md: 2, lg: 5, xl: 40 }}
          mt={3}
        >
          <Divider flexItem sx={{ my: 3, mx: { xs: 1, md: 10 } }} />
          <Typography variant="h5" mt={2}>
            Number of tasks per task status
          </Typography>
          <CustomPieChart data={getStatusData(tasks, timeFrame, chosenTime)} />
          <Divider flexItem sx={{ my: 3, mx: { xs: 1, md: 10 } }} />
          <Typography variant="h5" mt={2}>
            Number of tasks per priority
          </Typography>
          <CustomBarChart
            data={getPrioritiesDataset(
              tasks,
              priorities,
              timeFrame,
              chosenTime
            )}
          />
        </Box>
      ) : (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5">No tasks found.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Summary;
