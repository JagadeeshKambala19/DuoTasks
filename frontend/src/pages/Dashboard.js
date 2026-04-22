import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  async function fetchTasks() {
    const res = await api.get("/tasks");
    setTasks(res.data || []);
  }

  useEffect(() => {
    fetchTasks();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  async function addTask() {
    if (!newTask.trim()) return;

    const res = await api.post("/tasks", {
      title: newTask,
      status: "pending"
    });

    setTasks([res.data, ...tasks]);
    setNewTask("");
  }

  async function toggle(task) {
    const updated = await api.put(`/tasks/${task.id}`, {
      ...task,
      status: task.status === "completed" ? "pending" : "completed"
    });

    setTasks(tasks.map(t => (t.id === task.id ? updated.data : t)));
  }

  async function remove(id) {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  }


  function logout() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");

    navigate("/", { replace: true });
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#eef2ff] to-[#f8fafc]">


      <div className="fixed top-10 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center justify-between gap-6 px-6 py-2.5 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-full shadow-md w-[320px]">
          <span className="text-base font-medium text-gray-800 tracking-tight">
            TaskFlow
          </span>

          <div className="w-px h-4 bg-gray-200" />

          <button
            onClick={logout}
            className="text-sm font-medium text-gray-500 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>


      <div className="max-w-xl mx-auto pt-36 px-3 h-[calc(100vh-120px)] flex flex-col">


        <div className="
          flex items-center gap-2
          bg-white/80 backdrop-blur-md
          px-4 py-3
          rounded-full
          shadow-sm border border-gray-200
          mb-5
          transition hover:shadow-md
        ">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task..."
            className="flex-1 bg-transparent outline-none text-base text-gray-800 placeholder-gray-400"
          />

          <button
            onClick={addTask}
            className="
              px-4 py-1.5 rounded-full
              bg-indigo-600 text-white text-sm font-medium
              hover:bg-indigo-700 transition
            "
          >
            Add
          </button>
        </div>


        <div className="flex-1 border border-gray-200 bg-white rounded-lg overflow-y-auto p-2 space-y-2">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between px-4 py-3 text-base bg-white rounded-md border border-gray-200 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => toggle(task)}
                  className="w-4 h-4"
                />

                <span
                  className={`${task.status === "completed"
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                    }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => remove(task.id)}
                className="text-sm text-gray-400 hover:text-red-500 transition"
              >
                Delete
              </button>
            </div>
          ))}


          {tasks.length === 0 && (
            <div className="text-center text-sm text-gray-400 py-6">
              No tasks yet
            </div>
          )}
        </div>

      </div>
    </div>
  );
}