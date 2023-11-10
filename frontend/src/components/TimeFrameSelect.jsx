import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const TimeFrameSelect = ({
  timeFrame,
  setTimeFrame,
  chosenTime,
  setChosenTime,
}) => {
  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  const handleChosenTimeChange = (value) => {
    setChosenTime(value);
  };

  return (
    <Box textAlign="center">
      <FormControl sx={{ width: 150, mx: 2 }}>
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
        <DatePicker
          label="Time"
          views={
            timeFrame === "year"
              ? ["year"]
              : timeFrame === "month"
              ? ["month", "year"]
              : ["day", "month", "year"]
          }
          value={chosenTime}
          onChange={handleChosenTimeChange}
          sx={{ my: { xs: 2, sm: 0 } }}
        />
      )}
    </Box>
  );
};

export default TimeFrameSelect;
