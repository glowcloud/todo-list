import AddModal from "../components/home/AddModal";
import { useState } from "react";
import TasksList from "../components/tasksList/TasksList";
import AddFab from "../components/home/AddFab";
import CalendarView from "../components/calendarView/CalendarView";
import Summary from "../components/summary/Summary";
import { useDataContext } from "../context/DataContext";
import LoadingProgress from "../components/home/LoadingProgress";
import { Box } from "@mui/material";

const Home = ({ currentView }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { tasks, priorities } = useDataContext();

  const handleAddOpen = () => {
    setIsAddOpen(true);
  };

  const handleAddClose = () => {
    setIsAddOpen(false);
  };

  return priorities.length > 0 ? (
    <Box>
      {currentView === "calendar" && <CalendarView />}
      {currentView === "summary" && (
        <Summary tasks={tasks} priorities={priorities} />
      )}
      {currentView === "list" && <TasksList />}
      {currentView === "overdue" && <TasksList overdue />}
      {(currentView === "list" || currentView === "calendar") && (
        <AddFab handleAddOpen={handleAddOpen} />
      )}
      <AddModal isOpen={isAddOpen} handleModalClose={handleAddClose} />
    </Box>
  ) : (
    <LoadingProgress />
  );
};

export default Home;
