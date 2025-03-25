// backend/Task.js
const pool = require("./database");

// Create `tasks` table if it doesn't exist
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT false
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ 'tasks' table is ready!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
};

createTable();

// Function to add a new task
const addTask = async (title) => {
  const query = "INSERT INTO tasks (title) VALUES ($1) RETURNING *";
  const values = [title];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Function to get all tasks
const getTasks = async () => {
  const query = "SELECT * FROM tasks ORDER BY id DESC";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Function to update a task (toggle completion)
// Update a task's title and completed status
const updateTask = async (id, title, completed) => {
  const query = "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *";
  const values = [title, completed, id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return updated task
  } catch (err) {
    throw err;
  }
};


// Function to delete a task
const deleteTask = async (id) => {
  const query = "DELETE FROM tasks WHERE id = $1";
  const values = [id];
  try {
    await pool.query(query, values);
    return { message: "Task deleted successfully" };
  } catch (err) {
    throw err;
  }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };
