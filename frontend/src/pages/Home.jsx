import { Box, Fab } from "@mui/material";
import TaskCard from "../components/TaskCard";
import { Add } from "@mui/icons-material";
import AddModal from "../components/AddModal";
import { useState } from "react";
import TaskModal from "../components/TaskModal";

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
  { id: 4, text: "Highest", color: "rgba(255, 0, 0, 0.5)" },
  { id: 3, text: "High", color: "rgba(255, 165, 0, 0.5)" },
  { id: 2, text: "Moderate", color: "rgba(255, 243, 51, 0.55)" },
  { id: 1, text: "Low", color: "rgba(202, 255, 51, 0.65)" },
  { id: 0, text: "Lowest", color: "rgba(60, 179, 113, 0.5)"},
];

const Home = () => {
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [tasks, setTasks] = useState(dummyTasks);

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
        id: prevTasks.length > 0 ? prevTasks[prevTasks.length - 1].id + 1 : 1,
        ...task,
        finished: false,
      },
    ]);
  };

  const handleCheckTask = (id, isChecked) => {
    const curTask = tasks.find((task) => task.id === id);
    curTask.finished = isChecked;
    setTasks((prevTasks) => {
      return [...prevTasks.filter((task) => task.id !== id), curTask];
    });
  };

  return (
    <>
      <Box sx={{ my: 3, mx: { md: 15, lg: 25 } }}>
        {[...tasks]
          // .sort((x, y) => y.priority - x.priority)
          .sort((x, y) => x.finished - y.finished)
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleClick={() => setTaskOpen(task.id)}
              handleCheckTask={handleCheckTask}
              priorities={priorities}
            />
          ))}
        <Box
          position="fixed"
          bottom={15}
          right={0}
          textAlign="right"
          mr={5}
          mb={2}
        >
          <Fab color="primary" onClick={handleAddOpen}>
            <Add />
          </Fab>
        </Box>
      </Box>
      <TaskModal
        task={tasks.find((task) => task.id === taskOpen)}
        isOpen={taskOpen >= 0}
        handleModalClose={handleTaskClose}
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
