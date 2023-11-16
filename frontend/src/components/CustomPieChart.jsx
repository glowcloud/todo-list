import { PieChart } from "@mui/x-charts";

const CustomPieChart = ({ data, width, height }) => {
  return (
    <PieChart
      series={[
        {
          data: data,
          innerRadius: 0,
          outerRadius: 170,
          paddingAngle: 0,
          cornerRadius: 0,
          startAngle: 0,
          endAngle: 360,
        },
      ]}
      width={width}
      height={height}
    />
  );
};

export default CustomPieChart;
