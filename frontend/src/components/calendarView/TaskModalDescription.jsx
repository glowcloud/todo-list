import { Divider, Typography } from "@mui/material";

const TaskModalDescription = ({ description }) => {
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Description:
      </Typography>
      <Typography
        sx={{
          overflowWrap: "break-word",
        }}
        gutterBottom
      >
        {description}
      </Typography>
    </>
  );
};

export default TaskModalDescription;
