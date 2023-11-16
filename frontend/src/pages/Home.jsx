import AddModal from "../components/AddModal";
import { useEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import FiltersPopover from "../components/FiltersPopover";
import TasksList from "../components/TasksList";
import AddFab from "../components/AddFab";
import EditModal from "../components/EditModal";
import Search from "../components/Search";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import CalendarView from "../components/CalendarView";
import Summary from "../components/Summary";
import DownloadButton from "../components/DownloadButton";
import SwitchViewButtons from "../components/SwitchViewButtons";
import { isOverdue } from "../utils/generalUtils";
import { useAuth } from "../context/AuthContext";
import Login from "../components/Login";
import { useDataContext } from "../context/DataContext";

const Home = () => {
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [priorityFilters, setPriorityFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [currentView, setCurrentView] = useState("calendar");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { token } = useAuth();
  const { tasks, priorities, alertMsg, setAlertMsg } = useDataContext();

  useEffect(() => {
    if (alertMsg) {
      setIsSnackbarOpen(true);
    }
  }, [alertMsg]);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    setAlertMsg("");
  };

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

  const handleFilterClick = (id) => {
    setPriorityFilters((prevFilters) => {
      if (prevFilters.includes(id))
        return prevFilters.filter((item) => item !== id);
      else {
        return [...prevFilters, id];
      }
    });
  };

  return !token ? (
    <Login />
  ) : priorities.length > 0 ? (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 2 }}
        flexDirection={{ xs: "column-reverse", md: "row" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={{ xs: 0, md: 3 }}
        >
          <FiltersPopover
            handleFilterClick={handleFilterClick}
            priorities={priorities}
            priorityFilters={priorityFilters}
            setPriorityFilters={setPriorityFilters}
          />
          <Search search={search} setSearch={setSearch} />
        </Box>
        <SwitchViewButtons
          setCurrentView={setCurrentView}
          badgeContent={tasks.filter((task) => isOverdue(task)).length}
        />
      </Box>
      {currentView === "calendar" && (
        <>
          <CalendarView
            search={search}
            priorityFilters={priorityFilters}
            setTaskOpen={setTaskOpen}
          />
          <DownloadButton tasks={tasks} />
        </>
      )}
      {currentView === "summary" && (
        <Summary tasks={tasks} priorities={priorities} />
      )}
      {currentView === "list" && (
        <TasksList
          priorityFilters={priorityFilters}
          setTaskOpen={setTaskOpen}
          search={search}
        />
      )}
      {currentView === "overdue" && (
        <TasksList
          tasks={tasks.filter((task) => isOverdue(task))}
          priorityFilters={priorityFilters}
          setTaskOpen={setTaskOpen}
          search={search}
        />
      )}
      <AddFab handleAddOpen={handleAddOpen} />
      <TaskModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={taskOpen >= 0}
        handleModalClose={handleTaskClose}
        handleEditOpen={handleEditOpen}
        setAlertMsg={setAlertMsg}
      />
      <AddModal
        isOpen={isAddOpen}
        handleModalClose={handleAddClose}
        setAlertMsg={setAlertMsg}
      />
      <EditModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={isEditOpen}
        handleModalClose={handleEditClose}
        setAlertMsg={setAlertMsg}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
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
