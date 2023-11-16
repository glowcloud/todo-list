import AddModal from "../components/AddModal";
import { useState } from "react";
import TaskModal from "../components/TaskModal";
import TasksList from "../components/TasksList";
import AddFab from "../components/AddFab";
import EditModal from "../components/EditModal";
import { Box, CircularProgress, Typography } from "@mui/material";
import CalendarView from "../components/CalendarView";
import Summary from "../components/Summary";
import DownloadButton from "../components/DownloadButton";
import { useDataContext } from "../context/DataContext";

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
    <>
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
      <AddFab handleAddOpen={handleAddOpen} />
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
    </>
  ) : (
    <Box
      sx={{
        textAlign: "center",
        my: 45,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }} gutterBottom>
        Loading...
      </Typography>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Home;
