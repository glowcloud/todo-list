import { Card } from "@mui/material";
import { useDataContext } from "../../context/DataContext";
import { useState } from "react";
import TaskCardContent from "./TaskCardContent";
import TaskCardActions from "./TaskCardActions";
import TaskCardDescription from "./TaskCardDescription";
import AddEditModal from "../shared/AddEditModal";

const TaskCard = ({ task }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { handleCheckTask } = useDataContext();

  const handleCheck = async () => {
    await handleCheckTask(task.id, !task.finished);
  };

  const handleExpandedClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          m: 0.75,
        }}
      >
        <TaskCardContent task={task} handleEditOpen={handleEditOpen} />
        <TaskCardActions
          task={task}
          handleCheck={handleCheck}
          handleExpandedClick={handleExpandedClick}
        />
        {task?.description && (
          <TaskCardDescription
            description={task.description}
            expanded={expanded}
          />
        )}
      </Card>
      <AddEditModal
        task={task}
        isOpen={isEditOpen}
        handleModalClose={handleEditClose}
        isEdit
      />
    </>
  );
};

export default TaskCard;
