import { BarChart } from "@mui/x-charts";

const CustomBarChart = ({ data }) => {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: "band", dataKey: "time" }]}
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
      height={500}
      width={750}
    />
  );
};

export default CustomBarChart;
