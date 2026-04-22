import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function isAuthed() {
  return localStorage.getItem("isAuthenticated") === "true";
}

function ProtectedRoute({ children }) {
  if (!isAuthed()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: 24
  };

  const innerStyle = {
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    flex: 1
  };

  return (
    <BrowserRouter>
      <div style={containerStyle}>
        <div style={innerStyle}>
          <Routes>
            <Route
              path="/"
              element={isAuthed() ? <Navigate to="/dashboard" replace /> : <Login />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isAuthed() ? "/dashboard" : "/"} replace />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

