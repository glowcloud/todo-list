import {
  Box,
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
} from "@mui/material";
import TaskCard from "../components/TaskCard";
import { Add, FilterAlt } from "@mui/icons-material";
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
  { id: 4, text: "Highest", color: "rgba(255, 0, 0, 0.65)" },
  { id: 3, text: "High", color: "rgba(255, 165, 0, 0.65)" },
  { id: 2, text: "Moderate", color: "rgba(255, 243, 51, 0.75)" },
  { id: 1, text: "Low", color: "rgba(202, 255, 51, 0.75)" },
  { id: 0, text: "Lowest", color: "rgba(60, 179, 113, 0.75)" },
];

const Home = () => {
  const [taskOpen, setTaskOpen] = useState(-1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
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
      <Box sx={{ mt: 3, mx: { xs: 2, md: 15, lg: 25 } }}>
        <IconButton onClick={handlePopoverOpen}>
          <FilterAlt />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <FormGroup>
            {priorities.map((priority) => (
              <FormControlLabel
                key={priority.id}
                control={
                  <Checkbox checked={priorityFilters.includes(priority.id)} />
                }
                label={priority.text}
                sx={{ mx: 2, my: 1, color: priority.color }}
                onClick={() => handleFilterClick(priority.id)}
              />
            ))}
          </FormGroup>
          <Button

            variant="outlined"
            onClick={() => setPriorityFilters([])}
          >
            Clear
          </Button>
        </Popover>
      </Box>
      <Box sx={{ mx: { md: 15, lg: 25 } }}>
        {[...tasks]
          // .sort((x, y) => y.priority - x.priority)
          .filter(
            (task) =>
              priorityFilters.length === 0 ||
              priorityFilters.includes(task.priority)
          )
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
