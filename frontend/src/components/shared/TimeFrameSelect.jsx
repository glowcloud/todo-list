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
    <Box
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={{
        xs: "column",
        sm: timeFrame === "week" ? "column" : "row",
      }}
    >
      <FormControl sx={{ width: 150, mx: 1, my: 1 }}>
        <InputLabel>Timeframe</InputLabel>
        <Select
          label="Timeframe"
          id="timeframe"
          value={timeFrame}
          onChange={handleTimeFrameChange}
        >
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
            id="time-start"
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
            sx={{ mx: 1, mt: { xs: 1, sm: timeFrame === "week" ? 1 : 0 } }}
          />
          {timeFrame === "week" && (
            <DatePicker
              id="time-end"
              label="End"
              value={dayjs(chosenTime).endOf("w")}
              sx={{ mt: 1 }}
              onChange={handleChosenTimeChange}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default TimeFrameSelect;
