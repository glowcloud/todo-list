import dayjs from "dayjs";
import CustomDatePicker from "./CustomDatePicker";
import CustomDateTimePicker from "./CustomDateTimePicker";
import { isDateError } from "../../utils/addEditUtils";

const AddEditDates = ({
  formState,
  handleStartChange,
  handleEndChange,
  error,
}) => {
  if (formState.allDay)
    return (
      <>
        <CustomDatePicker
          label="Start"
          value={formState.startDate}
          handleChange={handleStartChange}
          error={isDateError(error, formState)}
        />

        <CustomDatePicker
          label="End"
          value={formState.endDate}
          handleChange={handleEndChange}
          error={isDateError(error, formState)}
          minDate={{ minDate: formState.startDate }}
        />
      </>
    );
  return (
    <>
      <CustomDateTimePicker
        label="Start"
        value={formState.startDate}
        handleChange={handleStartChange}
        error={isDateError(error, formState)}
      />
      <CustomDateTimePicker
        label="End"
        value={formState.endDate}
        handleChange={handleEndChange}
        error={isDateError(error, formState)}
        minDateTime={{
          minDateTime: dayjs(formState.startDate).add(5, "minutes"),
        }}
      />
    </>
  );
};

export default AddEditDates;
