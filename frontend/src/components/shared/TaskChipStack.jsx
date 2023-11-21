import { Stack } from "@mui/material";
import TaskChip from "./TaskChip";
import { isOverdue } from "../../utils/generalUtils";

const TaskChipStack = ({ task }) => {
  return (
    <Stack spacing={1} alignItems="start" mb={1}>
      <TaskChip
        text={
          task?.finished ? "Finished" : isOverdue(task) ? "Overdue" : "To Do"
        }
      />
      <TaskChip text={`${task && task.priority.name} priority`} />
    </Stack>
  );
};

export default TaskChipStack;
