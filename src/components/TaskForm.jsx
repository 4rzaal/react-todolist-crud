
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const emptyTask = {
  name: '',
  priority: 'Medium',
  status: 'To Do',
};

function TaskForm({
  show,
  handleClose,
  addTask,
  editTask,
  taskToEdit,
}) {
  const [task, setTask] = useState(emptyTask);

  // Mengatur isi form ketika tambah atau edit
  useEffect(() => {
    if (taskToEdit) {
      setTask({
        name: taskToEdit.name,
        priority: taskToEdit.priority,
        status: taskToEdit.status,
      });
    } else {
      setTask({ ...emptyTask });
    }
  }, [taskToEdit, show]);

  // Mengambil perubahan dari input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Menyimpan data tugas
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.name.trim()) return;

    const taskData = {
      ...task,
      name: task.name.trim(),
    };

    if (taskToEdit) {
      editTask({ ...taskToEdit, ...taskData });
    } else {
      addTask(taskData);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {taskToEdit ? 'Edit Tugas' : 'Tambah Tugas'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nama Tugas</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Masukkan nama kegiatan..."
              value={task.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prioritas</Form.Label>
            <Form.Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            Batal
          </Button>

          <Button variant="primary" type="submit">
            {taskToEdit ? 'Update Tugas' : 'Tambah Tugas'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskForm;
