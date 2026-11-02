
import { useMemo, useState } from 'react';

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';

import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';

import './App.css';

function App() {
  // Menyimpan daftar tugas
  const [tasks, setTasks] = useState([]);

  // Mengatur modal tambah/edit
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Pencarian dan filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Membuka form tambah
  const handleShowForm = () => {
    setTaskToEdit(null);
    setShowForm(true);
  };

  // Menutup form
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  // CREATE
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // UPDATE
  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // DELETE
  const deleteTask = (id) => {
    const confirmDelete = window.confirm(
      'Apakah kamu yakin ingin menghapus tugas ini?'
    );

    if (!confirmDelete) return;

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  // Membuka form edit
  const showEditForm = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  // Menghitung statistik tugas
  const doneCount = tasks.filter(
    (task) => task.status === 'Done'
  ).length;

  const activeCount = tasks.length - doneCount;

  // Pencarian dan filter
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ||
        task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);

  return (
    <main className="app-shell">
      <Container className="app-container py-5">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="app-kicker">
              PRAKTIKUM 6 • PEMROGRAMAN FULLSTACK
            </span>

            <h1 className="app-title">
              TodoList Manager
            </h1>

            <p className="text-muted mb-0">
              Kelola kegiatan dan tugasmu dengan lebih teratur.
            </p>
          </div>

          <Button variant="primary" onClick={handleShowForm}>
            + Tambah Tugas
          </Button>
        </div>

        {/* RINGKASAN */}
        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card className="summary-card">
              <Card.Body>
                <p className="summary-label">Total Tugas</p>
                <h3>{tasks.length}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="summary-card">
              <Card.Body>
                <p className="summary-label">Belum Selesai</p>
                <h3>{activeCount}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="summary-card">
              <Card.Body>
                <p className="summary-label">Tugas Selesai</p>
                <h3>{doneCount}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SEARCH DAN FILTER */}
        <Card className="toolbar-card mb-3">
          <Card.Body>
            <Row className="g-2">
              <Col md={8}>
                <InputGroup>
                  <InputGroup.Text>
                    ⌕
                  </InputGroup.Text>

                  <Form.Control
                    type="text"
                    placeholder="Cari nama tugas..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />
                </InputGroup>
              </Col>

              <Col md={4}>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >
                  <option value="All">Semua Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* DAFTAR TUGAS */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="section-title mb-0">
            Daftar Tugas
          </h4>

          <Badge bg="dark">
            {filteredTasks.length} Tugas
          </Badge>
        </div>

        {tasks.length > 0 && filteredTasks.length === 0 ? (
          <div className="empty-state text-center">
            <h5>Tugas tidak ditemukan</h5>
            <p>Coba gunakan kata kunci atau filter lain.</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            showEditForm={showEditForm}
          />
        )}

        {/* FORM TAMBAH DAN EDIT */}
        <TaskForm
          show={showForm}
          handleClose={handleCloseForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />

        <footer className="text-center text-muted mt-5">
          <small>
            TodoList Manager • React 19 & Bootstrap
          </small>
        </footer>

      </Container>
    </main>
  );
}

export default App;
