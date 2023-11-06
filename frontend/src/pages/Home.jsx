import AddModal from "../components/AddModal";
import { useEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import FiltersPopover from "../components/FiltersPopover";
import TasksList from "../components/TasksList";
import AddFab from "../components/AddFab";
import EditModal from "../components/EditModal";
import Search from "../components/Search";
import { Box } from "@mui/material";
import CalendarView from "../components/CalendarView";
import Summary from "../components/Summary";
import DownloadButton from "../components/DownloadButton";

const Home = () => {
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [priorityFilters, setPriorityFilters] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("http://localhost:8080/tasks");
      const json = await res.json();
      setTasks(json);
    };

    const getPriorities = async () => {
      const res = await fetch("http://localhost:8080/priorities");
      const json = await res.json();
      setPriorities(json);
    };

    getPriorities();
    getTasks();
  }, []);

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

    const res = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    setTasks((prevTasks) => [...prevTasks, json]);
  };

  const handleEditTask = async (task) => {
    if (!task.priority.id) {
      task.priority = priorities.find(
        (priority) => priority.id === task.priority
      );
    }

    const res = await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const json = await res.json();

      setTasks((prevTasks) => {
        const filteredTasks = prevTasks.filter((t) => t.id !== task.id);
        return [...filteredTasks, json];
      });
      setIsEditOpen(false);
    }
  };

  const handleDeleteTask = async (id) => {
    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
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

  return priorities.length > 0 ? (
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
      <Summary tasks={tasks} priorities={priorities} />
      <Box display="flex" alignItems="center" justifyContent="left">
        <FiltersPopover
          handleFilterClick={handleFilterClick}
          priorities={priorities}
          priorityFilters={priorityFilters}
          setPriorityFilters={setPriorityFilters}
        />
        <Search search={search} setSearch={setSearch} />
      </Box>
      <TasksList
        tasks={[...tasks]}
        priorityFilters={priorityFilters}
        setTaskOpen={setTaskOpen}
        handleCheckTask={handleCheckTask}
        priorities={priorities}
        search={search}
      />
      <AddFab handleAddOpen={handleAddOpen} />
      <TaskModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={taskOpen >= 0}
        handleModalClose={handleTaskClose}
        handleCheckTask={handleCheckTask}
        priorities={priorities}
        handleEditOpen={handleEditOpen}
        handleDeleteTask={handleDeleteTask}
      />
      <AddModal
        isOpen={isAddOpen}
        handleModalClose={handleAddClose}
        handleAddTask={handleAddTask}
        priorities={priorities}
      />
      <EditModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={isEditOpen}
        handleModalClose={handleEditClose}
        handleEditTask={handleEditTask}
        priorities={priorities}
      />
    </>
  ) : (
    "Loading..."
  );
};

export default Home;
