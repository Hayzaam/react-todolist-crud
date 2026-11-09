import React from "react";
import { Button, Card, Badge } from "react-bootstrap";

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  // Lencana (badge) warna sesuai prioritas tugas
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge bg="danger">High</Badge>;
      case "Medium":
        return (
          <Badge bg="warning" text="dark">
            Medium
          </Badge>
        );
      case "Low":
        return <Badge bg="success">Low</Badge>;
      default:
        return <Badge bg="secondary">{priority}</Badge>;
    }
  };

  // Lencana (badge) indikator status tugas
  const getStatusBadge = (status) => {
    switch (status) {
      case "Done":
        return <Badge bg="success">Done</Badge>;
      case "In Progress":
        return (
          <Badge bg="info" text="dark">
            In Progress
          </Badge>
        );
      case "To Do":
        return <Badge bg="secondary">To Do</Badge>;
      default:
        return <Badge bg="dark">{status}</Badge>;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center my-5 text-muted">
        <h5>Tidak ada tugas ditemukan.</h5>
        <p>Klik tombol "+ Add Task" untuk membuat tugas baru.</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <Card className="mb-3 shadow-sm border-0" key={task.id}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-2 fw-bold">{task.name}</h5>
              <div className="d-flex gap-2 align-items-center mb-1">
                <small className="text-muted">Priority:</small>
                {getPriorityBadge(task.priority)}
                <small className="text-muted ms-2">Status:</small>
                {getStatusBadge(task.status)}
              </div>
              {task.createdAt && (
                <small
                  className="text-muted d-block mt-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  🕒 Dibuat: {task.createdAt}
                </small>
              )}
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => showEditForm(task)}
              >
                ✏️ Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteTask(task.id)}
              >
                🗑️ Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
