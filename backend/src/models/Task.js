// Task.js
// This file defines the Mongoose schema for our Task model.

const mongoose = require('mongoose'); // Import Mongoose

// Define the Task Schema
const taskSchema = new mongoose.Schema({
    // 'title' field: A string, required, and trimmed (whitespace removed from ends).
    title: {
        type: String,
        required: [true, 'Please add a task title'], // Custom error message if not provided
        trim: true,
    },
    // 'description' field: A string, optional.
    description: {
        type: String,
        required: false, // Not required
    },
    // 'priority' field: A string, required, with allowed enum values.
    // This helps categorize tasks and can be used for priority queue logic later.
    priority: {
        type: String,
        required: [true, 'Please set a priority (High, Medium, Low)'],
        enum: ['High', 'Medium', 'Low'], // Only these values are allowed
        default: 'Medium', // Default priority if not specified
    },
    // 'status' field: A string, required, with allowed enum values.
    // This tracks whether a task is 'pending' or 'completed'.
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed'], // Tasks can be pending or completed
        default: 'pending', // New tasks are pending by default
    },
    // 'createdAt' field: A Date, automatically set when a new task is created.
    createdAt: {
        type: Date,
        default: Date.now, // Sets the current date/time by default
    },
    // 'completedAt' field: A Date, optional, set when a task is marked as completed.
    completedAt: {
        type: Date,
        required: false,
    },
});

// Create and export the Task model based on the schema.
// Mongoose will automatically create a collection named 'tasks' (lowercase, plural of 'Task').
module.exports = mongoose.model('Task', taskSchema);
