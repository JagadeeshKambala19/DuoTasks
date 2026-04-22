const taskModel = require("../models/taskModel");

function parseId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

function normalizeStatus(status) {
  if (status === "pending" || status === "completed") return status;
  return null;
}

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("GET /tasks failed:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body || {};

    if (!title || String(title).trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const normalizedStatus = status ? normalizeStatus(status) : "pending";
    if (!normalizedStatus) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const created = await taskModel.createTask({
      title: String(title).trim(),
      description,
      status: normalizedStatus
    });

    res.status(201).json(created);
  } catch (error) {
    console.error("POST /tasks failed:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const { title, description, status } = req.body || {};

    if (!title || String(title).trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const normalizedStatus = normalizeStatus(status);
    if (!normalizedStatus) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await taskModel.updateTask(id, {
      title: String(title).trim(),
      description,
      status: normalizedStatus
    });

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("PUT /tasks/:id failed:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const deleted = await taskModel.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("DELETE /tasks/:id failed:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

