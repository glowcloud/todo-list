import { BarChart } from "@mui/x-charts";

const CustomBarChart = ({ data }) => {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
    />
  );
};

export default CustomBarChart;
