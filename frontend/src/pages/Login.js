import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", username || "User");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2ff] to-[#f8fafc]">
      <div className="w-full max-w-sm p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2 mb-6">
          Sign in to continue
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-5 py-4 rounded-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-5 py-4 rounded-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}