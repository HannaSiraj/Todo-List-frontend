import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.error("No token found! Please log in.");
  //         return;
  //       }

  //       console.log("Fetching tasks with token:", token);

  //       const response = await fetch("http://localhost:5000/api/tasks", {
  //         method: "GET",
  //         headers: {
  //           "Authorization": `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.error || "Failed to fetch tasks");
  //       }

  //       const data = await response.json();
  //       console.log("Fetched tasks:", data);
  //       setTasks(data);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error.message);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found! Please log in.");
          return;
        }
  
        console.log("Fetching tasks with token:", token);
  
        const response = await fetch("http://localhost:5000/api/tasks", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch tasks");
        }
  
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
  
    // ✅ Fetch tasks on component mount
    fetchTasks();
  
    // ✅ Listen for login event to refetch tasks
    window.addEventListener("login", fetchTasks);
  
    // ✅ Cleanup event listener on unmount
    return () => {
      window.removeEventListener("login", fetchTasks);
    };
  }, []);
  
  

  const addTask = async () => {
    if (!newTask.trim()) {
      alert("Task title is required");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask.trim() }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, data]); // ✅ Add new task to state
        setNewTask(""); // ✅ Clear input field
      } else {
        alert(data.error || "Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  




  const toggleTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const taskToToggle = tasks.find((task) => task.id === taskId);
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !taskToToggle.completed }),
      });

      if (!response.ok) throw new Error("Failed to toggle task");

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (taskId, newTitle) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <button className="add-button" onClick={addTask}>
          ➕ Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTask={() => toggleTask(task.id)}
            deleteTask={() => deleteTask(task.id)}
            updateTask={updateTask}
          />
        ))}
      </ul>
      <p className="progress">
        📊 {tasks.filter((task) => task.completed).length} / {tasks.length} tasks completed
      </p>
    </div>
  );
};

export default TodoList;