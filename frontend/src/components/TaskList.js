import React, { useMemo } from "react";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

export default function TaskList({
  tasks,
  loading,
  busyId,
  onEdit,
  onDelete,
  onToggleStatus
}) {
  const styles = useMemo(
    () => ({
      title: { margin: "0 0 12px 0", fontSize: 16, fontWeight: 800 },
      empty: { color: "#9ca3af", padding: 10 },
      list: { display: "flex", flexDirection: "column", gap: 10 },
      item: {
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(0,0,0,0.18)",
        padding: 12
      },
      top: { display: "flex", justifyContent: "space-between", gap: 10 },
      taskTitle: { fontWeight: 800, margin: 0, fontSize: 14 },
      badge: (status) => ({
        padding: "3px 8px",
        borderRadius: 999,
        fontSize: 12,
        border: "1px solid rgba(255,255,255,0.12)",
        background: status === "completed" ? "rgba(34, 197, 94, 0.16)" : "rgba(245, 158, 11, 0.16)",
        color: status === "completed" ? "#bbf7d0" : "#fde68a",
        whiteSpace: "nowrap",
        height: "fit-content"
      }),
      desc: { margin: "8px 0 0 0", color: "#cbd5e1", fontSize: 13, lineHeight: 1.35 },
      meta: { marginTop: 8, display: "flex", justifyContent: "space-between", gap: 10, color: "#9ca3af", fontSize: 12 },
      buttons: { marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" },
      btn: {
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
        color: "#e5e7eb",
        cursor: "pointer",
        fontWeight: 800,
        fontSize: 12
      },
      danger: { background: "rgba(239, 68, 68, 0.18)" }
    }),
    []
  );

  return (
    <div>
      <div style={styles.title}>Tasks</div>

      {loading ? <div style={styles.empty}>Loading...</div> : null}

      {!loading && (!tasks || tasks.length === 0) ? (
        <div style={styles.empty}>No tasks yet. Add one on the left.</div>
      ) : null}

      <div style={styles.list}>
        {(tasks || []).map((task) => {
          const disabled = busyId === task.id;
          return (
            <div key={task.id} style={styles.item}>
              <div style={styles.top}>
                <p style={styles.taskTitle}>{task.title}</p>
                <span style={styles.badge(task.status)}>{task.status}</span>
              </div>

              {task.description ? <p style={styles.desc}>{task.description}</p> : null}

              <div style={styles.meta}>
                <span>ID: {task.id}</span>
                <span>{formatDate(task.created_at)}</span>
              </div>

              <div style={styles.buttons}>
                <button
                  style={styles.btn}
                  onClick={() => onToggleStatus(task)}
                  disabled={disabled}
                >
                  {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
                </button>
                <button style={styles.btn} onClick={() => onEdit(task)} disabled={disabled}>
                  Edit
                </button>
                <button
                  style={{ ...styles.btn, ...styles.danger }}
                  onClick={() => onDelete(task.id)}
                  disabled={disabled}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

