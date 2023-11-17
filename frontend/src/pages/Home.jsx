import AddModal from "../components/AddModal";
import { useState } from "react";
import TaskModal from "../components/TaskModal";
import TasksList from "../components/TasksList";
import AddFab from "../components/AddFab";
import EditModal from "../components/EditModal";
import CalendarView from "../components/CalendarView";
import Summary from "../components/Summary";
import DownloadButton from "../components/DownloadButton";
import { useDataContext } from "../context/DataContext";
import LoadingProgress from "../components/LoadingProgress";
import { Box } from "@mui/material";

const Home = ({ currentView }) => {
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { tasks, priorities } = useDataContext();

  const handleTaskClose = () => {
    setTaskOpen(-1);
  };

  const handleAddOpen = () => {
    setIsAddOpen(true);
  };

  const handleAddClose = () => {
    setIsAddOpen(false);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  return priorities.length > 0 ? (
    <Box>
      {currentView === "calendar" && (
        <>
          <CalendarView setTaskOpen={setTaskOpen} />
          <DownloadButton tasks={tasks} />
        </>
      )}
      {currentView === "summary" && (
        <Summary tasks={tasks} priorities={priorities} />
      )}
      {currentView === "list" && <TasksList setTaskOpen={setTaskOpen} />}
      {currentView === "overdue" && (
        <TasksList setTaskOpen={setTaskOpen} overdue />
      )}
      {(currentView === "list" || currentView === "calendar") && (
        <AddFab handleAddOpen={handleAddOpen} />
      )}
      <TaskModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={taskOpen >= 0}
        handleModalClose={handleTaskClose}
        handleEditOpen={handleEditOpen}
      />
      <AddModal isOpen={isAddOpen} handleModalClose={handleAddClose} />
      <EditModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={isEditOpen}
        handleModalClose={handleEditClose}
      />
    </Box>
  ) : (
    <LoadingProgress />
  );
};

export default Home;
