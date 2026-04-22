const { pool } = require("../config/db");

async function getAllTasks() {
  const [rows] = await pool.query(
    "SELECT id, title, description, status, created_at FROM tasks ORDER BY created_at DESC, id DESC"
  );
  return rows;
}

async function createTask({ title, description, status }) {
  const normalizedStatus = status || "pending";
  const normalizedDescription =
    description === undefined || description === null || description === ""
      ? null
      : description;

  const [result] = await pool.execute(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, normalizedDescription, normalizedStatus]
  );

  const [rows] = await pool.execute(
    "SELECT id, title, description, status, created_at FROM tasks WHERE id = ?",
    [result.insertId]
  );
  return rows[0];
}

async function updateTask(id, { title, description, status }) {
  const normalizedDescription =
    description === undefined || description === null || description === ""
      ? null
      : description;

  const [result] = await pool.execute(
    "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
    [title, normalizedDescription, status, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await pool.execute(
    "SELECT id, title, description, status, created_at FROM tasks WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function deleteTask(id) {
  const [result] = await pool.execute("DELETE FROM tasks WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};

