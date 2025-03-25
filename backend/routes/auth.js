const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg"); // Import pg directly since server.js uses it
require("dotenv").config();

const router = express.Router();

// PostgreSQL Connection (reuse the same config as server.js)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASS),
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

// Authentication Middleware
const authenticateUser = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Expecting "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
};

// User Registration Route
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into database
        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        );

        // Generate JWT Token
        const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "Registration successful", token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Export both router and middleware
module.exports = { router, authenticateUser };