import React, { useMemo, useState } from "react";

export default function TaskForm({
  mode,
  initialTask,
  onCancel,
  onCreate,
  onUpdate
}) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [status, setStatus] = useState(initialTask?.status || "pending");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const styles = useMemo(
    () => ({
      title: { margin: "0 0 12px 0", fontSize: 16, fontWeight: 800 },
      label: { display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 6 },
      input: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(0,0,0,0.25)",
        color: "#e5e7eb",
        outline: "none"
      },
      textarea: { minHeight: 90, resize: "vertical" },
      row: { marginBottom: 12 },
      buttons: { display: "flex", gap: 10, marginTop: 8 },
      primary: {
        flex: 1,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "#16a34a",
        color: "white",
        fontWeight: 800,
        cursor: "pointer"
      },
      secondary: {
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
        color: "#e5e7eb",
        fontWeight: 800,
        cursor: "pointer"
      },
      error: {
        background: "rgba(239, 68, 68, 0.12)",
        border: "1px solid rgba(239, 68, 68, 0.25)",
        color: "#fecaca",
        borderRadius: 12,
        padding: "10px 12px",
        marginBottom: 12
      }
    }),
    []
  );

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description,
        status
      };

      if (mode === "edit" && initialTask) {
        await onUpdate(initialTask.id, payload);
      } else {
        await onCreate(payload);
        setTitle("");
        setDescription("");
        setStatus("pending");
      }
    } catch (e2) {
      setError(e2?.response?.data?.message || e2.message || "Request failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div style={styles.title}>
        {mode === "edit" ? "Edit Task" : "Create Task"}
      </div>

      {error ? <div style={styles.error}>{error}</div> : null}

      <form onSubmit={submit}>
        <div style={styles.row}>
          <label style={styles.label}>Title</label>
          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Finish report"
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Description</label>
          <textarea
            style={{ ...styles.input, ...styles.textarea }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional details..."
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Status</label>
          <select
            style={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div style={styles.buttons}>
          <button style={styles.primary} type="submit" disabled={submitting}>
            {submitting
              ? "Saving..."
              : mode === "edit"
                ? "Update Task"
                : "Add Task"}
          </button>
          {mode === "edit" ? (
            <button
              style={styles.secondary}
              type="button"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

