import { PieChart } from "@mui/x-charts";
import { useMediaQuery, useTheme } from "@mui/material";

const CustomPieChart = ({ data }) => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <PieChart
      series={[
        {
          data: data,
          innerRadius: 0,
          outerRadius: matchesXS ? 110 : 170,
          paddingAngle: 0,
          cornerRadius: 0,
          startAngle: 0,
          endAngle: 360,
        },
      ]}
      width={matchesXS ? 375 : 500}
      height={matchesXS ? 300 : 400}
    />
  );
};

export default CustomPieChart;
