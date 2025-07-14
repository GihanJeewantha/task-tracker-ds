// server.js
// This file sets up the Express server, connects to MongoDB, and defines API routes.

require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Import the Express.js framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

// Create an Express application instance
const app = express();

// Define the port for the server to listen on.
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests.
app.use(express.json());

// Import task routes
const taskRoutes = require('./routes/taskRoutes');

// Mount the task routes under the /api/tasks path.
app.use('/api/tasks', taskRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Task Tracker Backend is Running!');
});

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB connected successfully!');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
