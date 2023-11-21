import { Box, Pagination } from "@mui/material";

const TasksListPagination = ({ tasks, page, handleChangePage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: { xs: 2, md: 4 },
      }}
    >
      <Pagination
        count={Math.ceil(tasks.length / 9)}
        page={page}
        onChange={handleChangePage}
      />
    </Box>
  );
};

export default TasksListPagination;
