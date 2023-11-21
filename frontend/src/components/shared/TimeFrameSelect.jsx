import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const TimeFrameSelect = ({
  timeFrame,
  setTimeFrame,
  chosenTime,
  setChosenTime,
}) => {
  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
    setChosenTime(dayjs());
  };

  const handleChosenTimeChange = (value) => {
    if (timeFrame === "week") {
      setChosenTime(dayjs(value).startOf("w"));
    } else {
      setChosenTime(value);
    }
  };

  return (
    <Box textAlign="center">
      <FormControl sx={{ width: 150, mx: 2, my: 1 }}>
        <InputLabel>Timeframe</InputLabel>
        <Select value={timeFrame} onChange={handleTimeFrameChange}>
          <MenuItem value="overall">Overall</MenuItem>
          <MenuItem value="year">Year</MenuItem>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="week">Week</MenuItem>
          <MenuItem value="day">Day</MenuItem>
        </Select>
      </FormControl>
      {timeFrame !== "overall" && (
        <Box>
          <DatePicker
            label={
              timeFrame === "week"
                ? "Start"
                : timeFrame === "year"
                ? "Year"
                : timeFrame === "month"
                ? "Month"
                : "Day"
            }
            views={
              timeFrame === "year"
                ? ["year"]
                : timeFrame === "month"
                ? ["month", "year"]
                : ["day", "month", "year"]
            }
            openTo={
              timeFrame === "year"
                ? "year"
                : timeFrame === "month"
                ? "month"
                : "day"
            }
            value={chosenTime}
            onChange={handleChosenTimeChange}
            sx={{ mt: { xs: 2, sm: 1 }, mx: 1 }}
          />
          {timeFrame === "week" && (
            <DatePicker
              label="End"
              value={dayjs(chosenTime).endOf("w")}
              sx={{ mt: { xs: 2, sm: 1 } }}
              onChange={handleChosenTimeChange}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default TimeFrameSelect;
