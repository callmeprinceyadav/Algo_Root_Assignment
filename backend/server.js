const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend requests
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});