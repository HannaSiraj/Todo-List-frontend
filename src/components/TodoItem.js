import React, { useState } from "react";
import { motion } from "framer-motion";
import "./TodoItem.css";

const TodoItem = ({ task, toggleTask, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title || ""); // ✅ Ensure the text is set correctly

// const handleEditClick = () => {
//     setEditedText(task.title);
//     setIsEditing(true);
// };

// const handleInputChange = (event) => {
//     setEditedText(event.target.value);
// };

const saveEdit = () => {
  console.log("🟡 DEBUG: Before saving edit - Task ID:", task.id, "Current title:", task.title, "Edited text:", editedText);

  if (!editedText.trim()) {
      console.warn("⚠️ Empty input, not updating task");
      return;
  }

  if (editedText !== task.title) {
      console.log("🟡 DEBUG: Calling updateTask with ID:", task.id, "Text:", editedText);
      updateTask(task.id, editedText);  // ✅ Ensure correct text is passed
  }

  setIsEditing(false);
};





  

  return (
    <motion.li
      className={`todo-item ${task.completed ? "completed" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {isEditing ? (
        // <input
        //   type="text"
        //   value={editedText}
        //   onChange={(e) => setEditedText(e.target.value)}
        //   onBlur={saveEdit}
        //   onKeyPress={(e) => e.key === "Enter" && saveEdit()}
        // />

        <input
  type="text"
  value={editedText}
  onChange={(e) => {
      console.log("🟡 DEBUG: Input changed - New Value:", e.target.value);
      setEditedText(e.target.value);  // ✅ Ensure correct text is saved
  }}
  onBlur={saveEdit}
  onKeyPress={(e) => e.key === "Enter" && saveEdit()}
/>


      ) : (
        <>
          <span onClick={toggleTask} className="task-text">
            {task.completed ? "✅ " : "⭕ "} {task.title}
          </span>
          {!task.completed && <button onClick={() => setIsEditing(true)}>✏️</button>}
          <button onClick={deleteTask}>🗑️</button>
        </>
      )}
    </motion.li>
  );
};

export default TodoItem;
