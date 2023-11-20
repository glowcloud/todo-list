import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { sendTask } from "../utils/calendarIntegrationUtils";
import { isOverdue } from "../utils/generalUtils";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
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
      } else {
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

  const handleAddTask = async (task) => {
    task.priority = priorities.find(
      (priority) => priority.id === task.priority
    );
    task.finished = false;

    setLoading(true);
    const res = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const json = await res.json();

      await sendTask(json, token);

      setLoading(false);
      setAlertMsg("Task added.");
      setAlertType("success");
      setTasks((prevTasks) => [...prevTasks, json]);
    } else {
      setLoading(false);
      setAlertMsg("Something went wrong, please try again.");
      setAlertType("error");
    }
  };

  const handleEditTask = async (task) => {
    if (!task.priority.id) {
      task.priority = priorities.find(
        (priority) => priority.id === task.priority
      );
    }

    setLoading(true);

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
      }
      setTasks((prevTasks) => {
        const filteredTasks = prevTasks.filter((t) => t.id !== task.id);
        return [...filteredTasks, json];
      });
      setLoading(false);
      setAlertMsg(task.finished ? "" : "Task edited.");
      setAlertType("success");
    } else {
      setLoading(false);
      setAlertMsg("Something went wrong, please try again.");
      setAlertType("error");
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);

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
      setLoading(false);
      setAlertMsg("Task deleted.");
      setAlertType("success");
    } else {
      setLoading(false);
      setAlertMsg("Something went wrong, please try again.");
      setAlertType("error");
    }
  };

  const handleCheckTask = async (id, isChecked) => {
    const curTask = tasks.find((task) => task.id === id);
    curTask.finished = isChecked;
    await handleEditTask(curTask);
  };

  const handleResend = async (task) => {
    setLoading(true);
    await sendTask(task, token);
    setLoading(false);
    setAlertMsg("Task resent.");
    setAlertType("success");
  };

  const getOverdueCount = () => {
    return tasks.filter((task) => isOverdue(task)).length;
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        priorities,
        loading,
        alertMsg,
        alertType,
        setAlertMsg,
        handleAddTask,
        handleEditTask,
        handleDeleteTask,
        handleCheckTask,
        handleResend,
        getOverdueCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
