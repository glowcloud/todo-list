import dayjs from "dayjs";

const defaultState = {
  title: "",
  description: "",
  startDate: dayjs(),
  endDate: dayjs().add(5, "minutes"),
  priority: 3,
  allDay: true,
};

const isFormValid = (formState) => {
  return (
    formState.title !== "" &&
    formState.startDate !== null &&
    formState.endDate !== null &&
    formState.description.length < 255 &&
    (dayjs(formState.endDate).isAfter(dayjs(formState.startDate)) ||
      dayjs(formState.endDate).isSame(dayjs(formState.startDate))) &&
    formState.priority > 0
  );
};

const isDateError = (error, formState) => {
  return (
    error &&
    (dayjs(formState.endDate).isBefore(dayjs(formState.startDate)) ||
      dayjs(formState.endDate).isSame(dayjs(formState.startDate)))
  );
};

export { defaultState, isFormValid, isDateError };
