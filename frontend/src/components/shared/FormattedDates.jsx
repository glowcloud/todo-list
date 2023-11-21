import dayjs from "dayjs";
import { Typography } from "@mui/material";

const FormattedDates = ({ startDate, endDate, allDay, finished, isModal }) => {
  if (dayjs(startDate).isSame(dayjs(endDate), "d")) {
    if (allDay) {
      return (
        <>
          <Typography
            variant="body2"
            sx={{
              textDecoration:
                !isModal && !isModal && finished ? "line-through" : "none",
            }}
          >
            on {dayjs(startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              textDecoration:
                !isModal && !isModal && finished ? "line-through" : "none",
            }}
          >
            all day
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography
            variant="body2"
            sx={{
              textDecoration: !isModal && finished ? "line-through" : "none",
            }}
          >
            on {dayjs(startDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              textDecoration: !isModal && finished ? "line-through" : "none",
            }}
          >
            from {dayjs(startDate).format("h:mm A")} to{" "}
            {dayjs(endDate).format("h:mm A")}
          </Typography>
        </>
      );
    }
  }
  if (allDay) {
    return (
      <>
        <Typography
          variant="body2"
          sx={{
            textDecoration: !isModal && finished ? "line-through" : "none",
          }}
        >
          from {dayjs(startDate).format("DD/MM/YYYY")}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            textDecoration: !isModal && finished ? "line-through" : "none",
          }}
        >
          to {dayjs(endDate).format("DD/MM/YYYY")}
        </Typography>
      </>
    );
  }
  return (
    <>
      <Typography
        variant="body2"
        sx={{
          textDecoration: !isModal && finished ? "line-through" : "none",
        }}
      >
        from {dayjs(startDate).format("h:mm A DD/MM/YYYY")}
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          textDecoration: !isModal && finished ? "line-through" : "none",
        }}
      >
        to {dayjs(endDate).format("h:mm A DD/MM/YYYY")}
      </Typography>
    </>
  );
};

export default FormattedDates;
