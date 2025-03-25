// backend/database.js
const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables

// PostgreSQL connection settings
const pool = new Pool({
  user: process.env.DB_USER,        // Your PostgreSQL username
  host: process.env.DB_HOST,        // e.g., 'localhost'
  database: process.env.DB_NAME,    // Your database name
  password: process.env.DB_PASS,    // Your PostgreSQL password
  port: process.env.DB_PORT || 5432 // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

module.exports = pool;
