// taskController.js
// This file contains the controller functions for handling task-related API requests.
// It interacts with the Task model and conceptually uses the Queue and Stack data structures.

const Task = require('../models/Task'); // Import the Task Mongoose model
const { Queue, Stack } = require('../utils/dataStructures'); // Import our Queue and Stack classes

// Initialize our conceptual data structures.
// In a real-world scenario, these would likely be managed differently (e.g., in-memory for a short period,
// or re-populated from the database on server start if truly transient).
// For this demonstration, they represent the logical flow.
const pendingTasksQueue = new Queue();
const completedTasksStack = new Stack();

// @desc    Get all tasks (pending and completed)
// @route   GET /api/tasks
// @access  Public
exports.getTasks = async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find().sort({ createdAt: -1 }); // Sort by creation date, newest first

        // Separate tasks into pending and completed for conceptual data structure representation
        const pending = tasks.filter(task => task.status === 'pending');
        const completed = tasks.filter(task => task.status === 'completed');

        // Note: For a real-time system, you would populate the Queue/Stack on server start
        // and then manage them in-memory, reflecting changes to the DB.
        // Here, we're conceptually showing how they *would* be used with the retrieved data.

        res.status(200).json({
            success: true,
            message: 'Tasks retrieved successfully',
            data: {
                allTasks: tasks,
                pendingTasks: pending, // Represents what would be in the queue
                completedTasks: completed, // Represents what would be in the stack
            }
        });
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Add a new task
// @route   POST /api/tasks
// @access  Public
exports.addTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        // Create a new task instance based on the Mongoose model
        const newTask = new Task({
            title,
            description,
            priority,
            status: 'pending' // New tasks are always pending initially
        });

        // Save the new task to the database
        const savedTask = await newTask.save();

        // Conceptually enqueue the new task into our pending tasks queue
        pendingTasksQueue.enqueue(savedTask);

        res.status(201).json({
            success: true,
            message: 'Task added successfully',
            data: savedTask
        });
    } catch (error) {
        // Handle Mongoose validation errors (e.g., missing required fields)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        console.error('Error adding task:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Mark a task as completed
// @route   PUT /api/tasks/:id/complete
// @access  Public
exports.completeTask = async (req, res) => {
    try {
        const { id } = req.params; // Get task ID from URL parameters

        // Find the task by ID and update its status to 'completed'
        const task = await Task.findByIdAndUpdate(
            id,
            { status: 'completed', completedAt: Date.now() }, // Set status and completion timestamp
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );

        // If task not found, return 404
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Conceptually move the task from pending to completed.
        // In a real app, you'd find and remove from pendingTasksQueue and push to completedTasksStack.
        // For simplicity here, we just push the completed task to the stack, assuming it's no longer in the queue.
        completedTasksStack.push(task);

        res.status(200).json({
            success: true,
            message: 'Task marked as completed',
            data: task
        });
    } catch (error) {
        console.error('Error completing task:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params; // Get task ID from URL parameters

        // Find the task by ID and delete it
        const task = await Task.findByIdAndDelete(id);

        // If task not found, return 404
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Conceptually, if the deleted task was pending, it would be removed from the queue.
        // If it was completed, it would be removed from the stack.
        // For this simple example, we just log the action.
        console.log(`Task deleted: ${task.title}`);

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: {} // Return empty data as the task is gone
        });
    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get pending tasks (from the conceptual queue)
// @route   GET /api/tasks/pending
// @access  Public
exports.getPendingTasks = async (req, res) => {
    try {
        // Fetch only pending tasks from the database
        const pending = await Task.find({ status: 'pending' }).sort({ createdAt: 1 }); // Oldest first for queue order

        // For demonstration, we'll clear and re-enqueue to show the queue concept
        // In a real app, you'd manage the in-memory queue more dynamically.
        pendingTasksQueue.clear();
        pending.forEach(task => pendingTasksQueue.enqueue(task));

        res.status(200).json({
            success: true,
            message: 'Pending tasks retrieved successfully (Queue concept)',
            data: pendingTasksQueue.getElements()
        });
    } catch (error) {
        console.error('Error fetching pending tasks:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get completed tasks (from the conceptual stack)
// @route   GET /api/tasks/completed
// @access  Public
exports.getCompletedTasks = async (req, res) => {
    try {
        // Fetch only completed tasks from the database
        // Sort by completedAt in descending order to represent LIFO (most recent on top)
        const completed = await Task.find({ status: 'completed' }).sort({ completedAt: -1 });

        // For demonstration, we'll clear and re-push to show the stack concept
        // In a real app, you'd manage the in-memory stack more dynamically.
        completedTasksStack.clear();
        completed.forEach(task => completedTasksStack.push(task));

        res.status(200).json({
            success: true,
            message: 'Completed tasks retrieved successfully (Stack concept)',
            data: completedTasksStack.getElements()
        });
    } catch (error) {
        console.error('Error fetching completed tasks:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
