import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
            />
            <strong>{task.title}</strong>
            <p>{task.description}</p>
          </div>
          <div>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;