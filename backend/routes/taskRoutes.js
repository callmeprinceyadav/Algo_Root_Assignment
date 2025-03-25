const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Load tasks from JSON file
const loadTasks = () => {
  try {
    const data = fs.readFileSync('data/tasks.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Save tasks to JSON file
const saveTasks = (tasks) => {
  fs.writeFile('data/tasks.json', JSON.stringify(tasks, null, 2), (err) => {
    if (err) console.error('Error saving tasks:', err);
  });
};

// Get all tasks
router.get('/tasks', (req, res) => {
  const tasks = loadTasks();
  res.status(200).json(tasks);
});

// Create a new task
router.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const tasks = loadTasks();
  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// Update a task
router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title !== undefined ? title : tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };
  saveTasks(tasks);
  res.status(200).json(tasks[taskIndex]);
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(task => task.id !== id);
  if (tasks.length === updatedTasks.length) {
    return res.status(404).json({ message: 'Task not found' });
  }
  saveTasks(updatedTasks);
  res.status(204).send();
});

module.exports = router;