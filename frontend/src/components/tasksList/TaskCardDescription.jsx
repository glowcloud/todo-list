import { Collapse, CardContent, Divider, Typography } from "@mui/material";

const TaskCardDescription = ({ description, expanded }) => {
  return (
    <Collapse in={expanded}>
      <CardContent>
        <Divider sx={{ mb: 2 }} />
        <Typography paragraph>{description}</Typography>
      </CardContent>
    </Collapse>
  );
};

export default TaskCardDescription;
