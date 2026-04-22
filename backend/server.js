require("dotenv").config();

const express = require("express");
const cors = require("cors");

const tasksRoutes = require("./routes/tasks");
const { pool, pingDatabase } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Task Management System API" });
});

app.use("/tasks", tasksRoutes);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDatabase({ retries = 30, delayMs = 2000 } = {}) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pingDatabase();
      console.log("Database connection successful.");
      return;
    } catch (error) {
      console.error(
        `Database connection attempt ${attempt}/${retries} failed: ${error.message}`
      );
      if (attempt === retries) {
        throw error;
      }
      await sleep(delayMs);
    }
  }
}

async function ensureSchema() {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS tasks (" +
    "id INT AUTO_INCREMENT PRIMARY KEY," +
    "title VARCHAR(255) NOT NULL," +
    "description TEXT," +
    "status ENUM('pending', 'completed') DEFAULT 'pending'," +
    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
    ")"
  );
}

async function start() {
  const port = process.env.PORT || 5001;

  try {
    await waitForDatabase();
    await ensureSchema();
    console.log("Database schema is ready.");

    app.listen(port, () => {
      console.log(`Backend server running on port ${port}.`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

start();

