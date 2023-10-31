import AddModal from "../components/AddModal";
import { useState } from "react";
import TaskModal from "../components/TaskModal";
import FiltersPopover from "../components/FiltersPopover";
import TasksList from "../components/TasksList";
import AddFab from "../components/AddFab";

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
    priority: 0,
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

const priorities = [
  { id: 4, text: "Highest", color: "rgba(255, 0, 0, 0.65)" },
  { id: 3, text: "High", color: "rgba(255, 165, 0, 0.65)" },
  { id: 2, text: "Moderate", color: "rgba(255, 243, 51, 0.75)" },
  { id: 1, text: "Low", color: "rgba(202, 255, 51, 0.75)" },
  { id: 0, text: "Lowest", color: "rgba(60, 179, 113, 0.75)" },
];

const Home = () => {
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [tasks, setTasks] = useState(dummyTasks);
  const [idCounter, setIdCounter] = useState(dummyTasks.length);
  const [priorityFilters, setPriorityFilters] = useState([]);

  const handleTaskClose = () => {
    setTaskOpen(-1);
  };

  const handleAddOpen = () => {
    setIsAddOpen(true);
  };

  const handleAddClose = () => {
    setIsAddOpen(false);
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

  return (
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
      />
      <AddModal
        isOpen={isAddOpen}
        handleModalClose={handleAddClose}
        handleAddTask={handleAddTask}
        priorities={priorities}
      />
    </>
  );
};

export default Home;
