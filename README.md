# Task Management Application

A simple full-stack task management application built with Node.js, Express, and React.

## Backend Setup
1. Navigate to `backend/`.
2. Run `npm install`.
3. Ensure `data/tasks.json` exists with `[]`.
4. Run `npm start` (server runs on `http://localhost:3001`).

## Frontend Setup
1. Navigate to `frontend/`.
2. Run `npm install`.
3. Run `npm start` (app runs on `http://localhost:3000`).

## API Endpoints
- **GET /api/tasks**: Retrieve all tasks.
  - Response: `200` with JSON array of tasks.
- **POST /api/tasks**: Create a new task.
  - Request: `{ "title": "Task", "description": "Details" }`
  - Response: `201` with created task, `400` if title missing.
- **PUT /api/tasks/:id**: Update a task.
  - Request: `{ "title": "Updated", "completed": true }`
  - Response: `200` with updated task, `404` if not found.
- **DELETE /api/tasks/:id**: Delete a task.
  - Response: `204` on success, `404` if not found.

## Testing
- Use Postman or curl:
  - `curl -X GET http://localhost:3001/api/tasks`
  - `curl -X POST -H "Content-Type: application/json" -d '{"title":"Test"}' http://localhost:3001/api/tasks`

## Screenshots
(Include screenshots of the task list, create form, and edit form here.)