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
  },
  {
    id: 1,
    title: "task 2",
    description: "some description",
    date: "today",
    finished: false,
  },
  {
    id: 2,
    title: "task 3",
    description: "some description",
    date: "today",
    finished: false,
  },
  {
    id: 3,
    title: "task 4",
    description: "some description",
    date: "today",
    finished: false,
  },
  {
    id: 4,
    title: "task 5",
    description: "some description",
    date: "today",
    finished: false,
  },
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
    setTasks((prevTasks) => [...prevTasks, { id: prevTasks.length, ...task }]);
  };

  return (
    <>
      <Box sx={{ my: 3, mx: { md: 15, lg: 25 } }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleClick={() => setTaskOpen(task.id)}
          />
        ))}
        <Box
          position="absolute"
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
        task={tasks[taskOpen]}
        isOpen={taskOpen >= 0}
        handleModalClose={handleTaskClose}
      />
      <AddModal
        isOpen={isAddOpen}
        handleModalClose={handleAddClose}
        handleAddTask={handleAddTask}
      />
    </>
  );
};

export default Home;
