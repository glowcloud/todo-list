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
import dayjs from "dayjs";
import { sendTask } from "../utils/calendarIntegrationUtils";
import { isOverdue } from "../utils/generalUtils";
import { useAuth } from "../context/AuthContext";
import Login from "../components/Login";

const Home = () => {
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [priorityFilters, setPriorityFilters] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [search, setSearch] = useState("");
  const [currentView, setCurrentView] = useState("calendar");
  const [addingTask, setAddingTask] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("http://localhost:8080/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok && res.status !== 204) {
        const json = await res.json();
        setTasks(json);
      }
      else {
        setTasks([]);
      }
    };

    const getPriorities = async () => {
      const res = await fetch("http://localhost:8080/priorities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const json = await res.json();
        setPriorities(json);
      }
    };

    if (token) {
      getPriorities();
      getTasks();
    }
  }, [token]);

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

  const handleAddTask = async (task) => {
    task.priority = priorities.find(
      (priority) => priority.id === task.priority
    );
    task.finished = false;

    setAddingTask(true);
    const res = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    await sendTask(json, token);

    setAddingTask(false);
    setAlertMsg("Task added and sent to your email.");
    setTasks((prevTasks) => [...prevTasks, json]);
  };

  const handleEditTask = async (task) => {
    if (!task.priority.id) {
      task.priority = priorities.find(
        (priority) => priority.id === task.priority
      );
    }

    setAddingTask(true);

    const res = await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const json = await res.json();
      if (!task.finished) {
        await sendTask(json, token);
        setTasks((prevTasks) => {
          const filteredTasks = prevTasks.filter((t) => t.id !== task.id);
          return [...filteredTasks, json];
        });
      }
      setIsEditOpen(false);
    }

    setAddingTask(false);
    setAlertMsg(task.finished ? "" : "Edited task was sent to your email.");
  };

  const handleDeleteTask = async (id) => {
    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setTasks((prevTasks) => {
        const filteredTasks = prevTasks.filter((t) => t.id !== id);
        return [...filteredTasks];
      });
      setTaskOpen(-1);
    }
  };

  const handleCheckTask = async (id, isChecked) => {
    const curTask = tasks.find((task) => task.id === id);
    curTask.finished = isChecked;
    await handleEditTask(curTask);
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
          badgeContent={
            tasks.filter(
              (task) =>
                !task.finished &&
                (dayjs(task.endDate).isBefore(dayjs()) ||
                  (dayjs().isSame(task.endDate, "d") && !task.allDay))
            ).length
          }
        />
      </Box>
      {currentView === "calendar" && (
        <>
          <CalendarView
            tasks={tasks.filter(
              (task) =>
                (task.title.includes(search) ||
                  task.description.includes(search)) &&
                (priorityFilters.length === 0 ||
                  priorityFilters.includes(task.priority.id))
            )}
            handleEditTask={handleEditTask}
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
          tasks={[...tasks]}
          priorityFilters={priorityFilters}
          setTaskOpen={setTaskOpen}
          handleCheckTask={handleCheckTask}
          priorities={priorities}
          search={search}
        />
      )}
      {currentView === "overdue" && (
        <TasksList
          tasks={tasks.filter((task) => !task.finished && isOverdue(task))}
          priorityFilters={priorityFilters}
          setTaskOpen={setTaskOpen}
          handleCheckTask={handleCheckTask}
          priorities={priorities}
          search={search}
        />
      )}
      <AddFab handleAddOpen={handleAddOpen} />
      <TaskModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={taskOpen >= 0}
        handleModalClose={handleTaskClose}
        handleCheckTask={handleCheckTask}
        priorities={priorities}
        handleEditOpen={handleEditOpen}
        handleDeleteTask={handleDeleteTask}
        setAlertMsg={setAlertMsg}
      />
      <AddModal
        isOpen={isAddOpen}
        handleModalClose={handleAddClose}
        handleAddTask={handleAddTask}
        priorities={priorities}
        addingTask={addingTask}
        setAlertMsg={setAlertMsg}
      />
      <EditModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={isEditOpen}
        handleModalClose={handleEditClose}
        handleEditTask={handleEditTask}
        priorities={priorities}
        addingTask={addingTask}
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
