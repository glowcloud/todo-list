import { DatePicker } from "@mui/x-date-pickers";
import { useDataContext } from "../../context/DataContext";

const CustomDatePicker = ({ label, value, handleChange, error, minDate }) => {
  const { loading } = useDataContext();

  return (
    <DatePicker
      id={label.toLowerCase()}
      label={label}
      orientation="portrait"
      value={value}
      disabled={loading}
      sx={{
        my: 1,
        mr: 1,
      }}
      onChange={handleChange}
      error={error}
      {...minDate}
    />
  );
};

export default CustomDatePicker;
