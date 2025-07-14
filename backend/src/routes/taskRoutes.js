// taskRoutes.js
// This file defines the API routes for tasks and maps them to controller functions.

const express = require('express'); // Import Express
const router = express.Router(); // Create a new router instance

// Import controller functions
const {
    getTasks,
    addTask,
    completeTask,
    deleteTask,
    getPendingTasks,
    getCompletedTasks
} = require('../controllers/taskController');

// Define routes and link them to respective controller functions:

// GET /api/tasks - Get all tasks
// POST /api/tasks - Add a new task
router.route('/').get(getTasks).post(addTask);

// PUT /api/tasks/:id/complete - Mark a task as completed
// DELETE /api/tasks/:id - Delete a task
router.route('/:id').put(completeTask).delete(deleteTask); // Note: For PUT, we're using a specific path /:id/complete in controller,
                                                          // so this route will be for general updates or specific actions on ID.
                                                          // Let's adjust this for clarity.

// Corrected routing for completeTask
router.put('/:id/complete', completeTask); // Specific route for completing a task

// GET /api/tasks/pending - Get tasks from the conceptual queue
router.get('/pending', getPendingTasks);

// GET /api/tasks/completed - Get tasks from the conceptual stack
router.get('/completed', getCompletedTasks);


module.exports = router; // Export the router to be used in server.js
