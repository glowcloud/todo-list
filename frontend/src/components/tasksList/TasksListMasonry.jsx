import { Box } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import TaskCard from "./TaskCard";

const paginate = (tasks, page) => {
  return tasks.slice((page - 1) * 9, page * 9);
};

const TasksListMasonry = ({ tasks, page }) => {
  return (
    <Box
      sx={{
        mx: { xs: 1, sm: 2, md: 10 },
        mt: 2,
        mb: { xs: 0, md: 2 },
      }}
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 900: 2, 1200: 3 }}>
        <Masonry>
          {paginate(
            tasks.map((task) => <TaskCard key={task.id} task={task} />),
            page
          )}
        </Masonry>
      </ResponsiveMasonry>
    </Box>
  );
};

export default TasksListMasonry;
