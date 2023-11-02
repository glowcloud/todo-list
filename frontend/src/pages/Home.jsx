import AddModal from "../components/AddModal";
import { useEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import FiltersPopover from "../components/FiltersPopover";
import TasksList from "../components/TasksList";
import AddFab from "../components/AddFab";
import EditModal from "../components/EditModal";

const dummyTasks = [
  {
    id: 0,
    title: "task 1",
    description: "some description",
    date: "today",
    finished: false,
    priority: 1,
  },
  {
    id: 1,
    title: "task 2",
    description: "some description",
    date: "today",
    finished: false,
    priority: 2,
  },
  {
    id: 2,
    title: "task 3",
    description: "some description",
    date: "today",
    finished: false,
    priority: 3,
  },
  {
    id: 3,
    title: "task 4",
    description: "some description",
    date: "today",
    finished: false,
    priority: 5,
  },
  {
    id: 4,
    title: "task 5",
    description: "some description",
    date: "today",
    finished: false,
    priority: 4,
  },
];

const Home = () => {
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tasks, setTasks] = useState(dummyTasks);
  const [idCounter, setIdCounter] = useState(dummyTasks.length);
  const [priorityFilters, setPriorityFilters] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    const getPriorities = async () => {
      const res = await fetch("http://localhost:8080/priorities");
      const json = await res.json();
      console.log(json);
      setPriorities(json);
    };
    getPriorities();
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

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: idCounter,
        ...task,
        finished: false,
      },
    ]);
    setIdCounter((prevIdCounter) => ++prevIdCounter);
  };

  const handleEditTask = (task) => {
    setTasks((prevTasks) => {
      const filteredTasks = prevTasks.filter((t) => t.id !== task.id);
      return [...filteredTasks, task];
    });
    setIsEditOpen(false);
  };

  const handleCheckTask = (id, isChecked) => {
    const curTask = tasks.find((task) => task.id === id);
    curTask.finished = isChecked;
    setTasks((prevTasks) => {
      return [...prevTasks.filter((task) => task.id !== id), curTask];
    });
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
      <FiltersPopover
        handleFilterClick={handleFilterClick}
        priorities={priorities}
        priorityFilters={priorityFilters}
        setPriorityFilters={setPriorityFilters}
      />
      <TasksList
        tasks={[...tasks]}
        priorityFilters={priorityFilters}
        setTaskOpen={setTaskOpen}
        handleCheckTask={handleCheckTask}
        priorities={priorities}
      />
      <AddFab handleAddOpen={handleAddOpen} />
      <TaskModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={taskOpen >= 0}
        handleModalClose={handleTaskClose}
        handleCheckTask={handleCheckTask}
        priorities={priorities}
        handleEditOpen={handleEditOpen}
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
