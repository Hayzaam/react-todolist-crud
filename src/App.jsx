import React, { useState } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Belajar React 19 & Vite",
      priority: "High",
      status: "In Progress",
      createdAt: "10:00 AM",
    },
    {
      id: 2,
      name: "Mengerjakan Praktikum 6 React JS",
      priority: "Medium",
      status: "To Do",
      createdAt: "11:30 AM",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowForm = () => setShowForm(true);

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  // Filter pencarian tugas dinamis
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Container className="my-5" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-primary mb-0">📋 Task List (CRUD)</h1>
          <p className="text-muted mb-0">Praktikum 6 - React JS & Bootstrap</p>
        </div>
        <Button
          variant="primary"
          onClick={handleShowForm}
          className="shadow-sm"
        >
          + Add Task
        </Button>
      </div>

      {/* Input Pencarian (Filter) */}
      <InputGroup className="mb-4">
        <Form.Control
          placeholder="🔍 Cari tugas berdasarkan nama..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Komponen Daftar Tugas */}
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        showEditForm={showEditForm}
      />

      {/* Komponen Modal Formulir */}
      <TaskForm
        show={showForm}
        handleClose={handleCloseForm}
        addTask={addTask}
        editTask={editTask}
        taskToEdit={taskToEdit}
      />
    </Container>
  );
}

export default App;
