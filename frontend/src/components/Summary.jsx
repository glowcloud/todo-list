import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";

const getData = (tasks, priorities, chartType) => {
  if (chartType === "finished") {
    let done = 0;
    let todo = 0;
    tasks.forEach((task) => {
      task.finished ? done++ : todo++;
    });

    return [
      {
        id: 0,
        value: done,
        label: "Finished tasks",
      },
      {
        id: 1,
        value: todo,
        label: "Tasks to finish",
      },
    ];
  } else if (chartType === "priorities") {
    const data = [];

    priorities.forEach((priority) => {
      const currTasks = tasks.filter(
        (task) => task.priority.id === priority.id
      );
      data.push({
        id: priority.id,
        label: priority.name,
        value: currTasks.length,
        color: priority.color,
      });
    });

    return data;
  }
};

const Summary = ({ tasks, priorities }) => {
  const [chartType, setChartType] = useState("priorities");

  return (
    <Box display="flex">
      <PieChart
        series={[
          {
            data: getData(tasks, priorities, chartType),
            innerRadius: 0,
            outerRadius: 170,
            paddingAngle: 0,
            cornerRadius: 0,
            startAngle: 0,
            endAngle: 360,
          },
        ]}
        width={500}
        height={500}
      />
    </Box>
  );
};

export default Summary;
