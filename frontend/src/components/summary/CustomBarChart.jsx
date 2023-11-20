import { useMediaQuery, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const getSettings = (matches, matchesSM, matchesMD) => {
  if (matches)
    return {
      yAxis: [{ scaleType: "band", dataKey: "time" }],
      layout: "horizontal",
      width: matchesSM ? 550 : 400,
      height: 750,
    };
  return {
    xAxis: [{ scaleType: "band", dataKey: "time" }],
    layout: "vertical",
    width: matchesMD ? 650 : 900,
    height: matchesMD ? 500 : 600,
  };
};

const CustomBarChart = ({ data }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.only("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));

  return (
    <BarChart
      dataset={data}
      series={[
        {
          dataKey: "Highest",
          label: "Highest",
          color: "rgba(255, 0, 0, 0.65)",
        },
        { dataKey: "High", label: "High", color: "rgba(255, 165, 0, 0.65)" },
        {
          dataKey: "Moderate",
          label: "Moderate",
          color: "rgba(255, 243, 51, 0.75)",
        },
        { dataKey: "Low", label: "Low", color: "rgba(202, 255, 51, 0.75)" },
        {
          dataKey: "Lowest",
          label: "Lowest",
          color: "rgba(60, 179, 113, 0.75)",
        },
      ]}
      margin={{ top: 75 }}
      {...getSettings(matches, matchesSM, matchesMD)}
    />
  );
};

export default CustomBarChart;
