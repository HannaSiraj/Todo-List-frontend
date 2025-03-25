// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Use Routes
// const { router: authRoutes, authenticateUser } = require("./routes/auth");
// app.use("/auth", authRoutes);

// Get Tasks for a User
// app.get("/api/tasks", authenticateUser, async (req, res) => {
//     try {
//         console.log("🔍 Checking user authentication:", req.user);
//         if (!req.user || !req.user.userId) {
//             console.error("❌ No user ID found in request.");
//             return res.status(401).json({ error: "Unauthorized: No user ID found" });
//         }

//         const userId = req.user.userId;
//         console.log("Fetching tasks for user:", userId);

//         const { pool } = require("./routes/auth"); // Import pool from auth.js
//         const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
//         res.json(result.rows);
//     } catch (error) {
//         console.error("❌ Error fetching tasks:", error.message);
//         res.status(500).json({ error: "Server error" });
//     }
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

// ✅ Fix Import: Import both router and authenticateUser correctly
const { router: authRoutes, authenticateUser } = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ PostgreSQL Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASS),
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

// ✅ Test Database Connection
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL!"))
    .catch(err => console.error("❌ Database Connection Error:", err.message));

// ✅ Use Routes
app.use("/auth", authRoutes);

// ✅ Get Tasks for a User
app.get("/api/tasks", authenticateUser, async (req, res) => {
    try {
        console.log("🔍 Checking user authentication:", req.user);
        if (!req.user || !req.user.userId) {
            console.error("❌ No user ID found in request.");
            return res.status(401).json({ error: "Unauthorized: No user ID found" });
        }

        const userId = req.user.userId;
        console.log("Fetching tasks for user:", userId);

        const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error fetching tasks:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Add a Task
app.post("/api/tasks", authenticateUser, async (req, res) => {
    console.log("🔍 Incoming request:", req.body);
    console.log("🔍 Authenticated user:", req.user);

    const { title } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        console.error("❌ No user ID found in request.");
        return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    if (!title) {
        return res.status(400).json({ error: "Task title is required" });
    }

    try {
        console.log("🟡 Adding Task for User:", userId);
        const result = await pool.query(
            "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
            [title, userId]
        );

        console.log("🟢 Task Added:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("🔴 Error adding task:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Update a Task
app.put("/api/tasks/:id", authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const userId = req.user.userId;

    if (title === undefined && completed === undefined) {
        return res.status(400).json({ error: "Missing fields to update" });
    }

    try {
        const result = await pool.query(
            "UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 AND user_id = $4 RETURNING *",
            [title, completed, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found or unauthorized" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("❌ Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Delete a Task
app.delete("/api/tasks/:id", authenticateUser, async (req, res) => {
    const userId = req.user.userId;
    const taskId = req.params.id;

    try {
        const task = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [taskId, userId]);
        if (task.rows.length === 0) {
            return res.status(403).json({ error: "Unauthorized or task not found" });
        }

        await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting task:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log('🚀 Server running on port ${PORT}');
});