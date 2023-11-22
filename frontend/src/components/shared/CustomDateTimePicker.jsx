import { DateTimePicker } from "@mui/x-date-pickers";
import { useDataContext } from "../../context/DataContext";

const CustomDateTimePicker = ({
  label,
  value,
  handleChange,
  error,
  minDateTime,
}) => {
  const { loading } = useDataContext();

  return (
    <DateTimePicker
      id={label.toLowerCase()}
      label={label}
      orientation="portrait"
      value={value}
      ampm={false}
      timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
      disabled={loading}
      sx={{
        my: 1,
        mr: 1,
      }}
      onChange={handleChange}
      error={error}
      {...minDateTime}
    />
  );
};

export default CustomDateTimePicker;
