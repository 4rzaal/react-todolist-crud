
import { Badge, Button, Card } from 'react-bootstrap';

function TaskList({ tasks, deleteTask, showEditForm }) {
  const priorityColor = {
    High: 'danger',
    Medium: 'warning',
    Low: 'success',
  };

  const statusColor = {
    'To Do': 'secondary',
    'In Progress': 'primary',
    Done: 'success',
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state text-center">
        <h5>Belum ada tugas</h5>
        <p>Tambahkan tugas pertama kamu untuk memulai.</p>
      </div>
    );
  }

  return (
    <div className="d-grid gap-3">
      {tasks.map((task) => (
        <Card className="task-card shadow-sm" key={task.id}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

              <div className="flex-grow-1">
                <h5 className="task-name">
                  {task.name}
                </h5>

                <div className="d-flex gap-2 flex-wrap mb-2">
                  <Badge
                    bg={priorityColor[task.priority]}
                    className={
                      task.priority === 'Medium' ? 'text-dark' : ''
                    }
                  >
                    {task.priority}
                  </Badge>

                  <Badge bg={statusColor[task.status]}>
                    {task.status}
                  </Badge>
                </div>

                <small className="text-muted">
                  Dibuat:{' '}
                  {new Date(task.createdAt).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </small>
              </div>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => showEditForm(task)}
                >
                  ✎ Edit
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  🗑 Hapus
                </Button>
              </div>

            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default TaskList;
