import { useMediaQuery, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { getColor } from "../../utils/generalUtils";

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
          color: getColor("Highest"),
        },
        { dataKey: "High", label: "High", color: getColor("High") },
        {
          dataKey: "Moderate",
          label: "Moderate",
          color: getColor("Moderate"),
        },
        {
          dataKey: "Low",
          label: "Low",
          color: getColor("Low"),
        },
        {
          dataKey: "Lowest",
          label: "Lowest",
          color: getColor("Lowest"),
        },
      ]}
      margin={{ top: 75 }}
      {...getSettings(matches, matchesSM, matchesMD)}
    />
  );
};

export default CustomBarChart;
