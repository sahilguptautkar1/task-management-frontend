import React, { useState, useEffect } from "react";
import { Typography, Alert, Box } from "@mui/material";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://task-management-backend-h8xr.onrender.com/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = (task: Task) => {
    fetch("https://task-management-backend-h8xr.onrender.com/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.errors.map((e: any) => e.msg).join(", "));
          });
        }
        return response.json();
      })
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setError(null);
      })
      .catch((error) => setError(`Error adding task: ${error.message}`));
  };

  const updateTask = (task: Task) => {
    fetch(`https://task-management-backend-h8xr.onrender.com/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.errors.map((e: any) => e.msg).join(", "));
          });
        }
        return response.json();
      })
      .then(() => {
        const updatedTasks = tasks.map((t) => (t._id === task._id ? task : t));
        setTasks(updatedTasks);
        setTaskToEdit(undefined);
        setError(null);
      })
      .catch((error) => setError(`Error updating task: ${error.message}`));
  };

  const deleteTask = (id: string) => {
    fetch(`https://task-management-backend-h8xr.onrender.com/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleSaveTask = (task: Task) => {
    if (taskToEdit) {
      updateTask(task);
    } else {
      addTask(task);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          background: "linear-gradient(to bottom,#9276ab, #f5ebf9, #9276ab)",
          minHeight: "100vh",
          minWidth:"100vw",
          width:"100%"
        }}
      >
        <Typography
          variant="h4"
          fontFamily={'"Merriweather", serif'}
          fontSize={"3vw"}
          fontWeight={"bold"}
          color={"rgb(46, 8, 69)"}
          sx={{
            textAlign: "center",
            mt: "7vh",
          }}
          gutterBottom
        >
          Task Management Application
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "90vw",
            gap: 2,
            p:5,justifyContent:"space-between"
          }}
        >
          <Box
            sx={{
              background: "white",
              borderRadius: 7,
              boxShadow: " 0px 0px 0px 3px rgba(0, 0, 0, 0.2)",
              p: 3,
              width: "25%",
              height: "100%",
              alignItems:"center",
              justifyContent:"center"
            }}
          >
            <TaskForm onSave={handleSaveTask} taskToEdit={taskToEdit} />
          </Box>
          <Box sx={{ width: "65%", height:"100%",
              alignItems:"center",
              justifyContent:"center" }}>
            <TaskList
              tasks={tasks}
              onEdit={setTaskToEdit}
              onDelete={deleteTask}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
