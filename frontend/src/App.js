import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create or update task
  const handleSaveTask = async (task) => {
    if (!task.title) {
      alert('Title is required');
      return;
    }
    try {
      if (selectedTask) {
        // Update existing task
        await axios.put(`/api/tasks/${selectedTask.id}`, task);
      } else {
        // Create new task
        await axios.post('/api/tasks', task);
      }
      fetchTasks();
      setShowCreateForm(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`/api/tasks/${task.id}`, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  // Edit task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowCreateForm(true);
  };

  return (
    <div className="App">
      <h1>Task Management</h1>
      <button onClick={() => { setShowCreateForm(true); setSelectedTask(null); }}>
        Create New Task
      </button>
      {showCreateForm && (
        <TaskForm
          task={selectedTask}
          onSave={handleSaveTask}
          onCancel={() => { setShowCreateForm(false); setSelectedTask(null); }}
        />
      )}
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;