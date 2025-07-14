// server.js
// This file sets up the Express server, connects to MongoDB, and defines a basic test route.

// Load environment variables from the .env file.
// This line must be at the very top of your application's entry file
// to ensure environment variables are loaded before they are accessed.
require('dotenv').config();

const express = require('express'); // Import the Express.js framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

// Create an Express application instance
const app = express();

// Define the port for the server to listen on.
// It tries to use the PORT environment variable (from .env) or defaults to 5000.
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests.
// This allows Express to understand JSON data sent in the request body (e.g., when adding a new task).
app.use(express.json());

// --- Basic Test Route ---
// This is a simple GET endpoint to verify that the server is running.
// When you visit http://localhost:5000/ in your browser, you should see the response.
app.get('/', (req, res) => {
    res.send('Task Tracker Backend is Running!');
});

// --- MongoDB Connection ---
// Get the MongoDB connection URI from environment variables.
// This variable (MONGO_URI) is loaded from your .env file.
const mongoUri = process.env.MONGO_URI;

// Attempt to connect to the MongoDB database using Mongoose.
// The `connect()` method returns a Promise, allowing us to handle success and failure.
mongoose.connect(mongoUri)
    .then(() => {
        // Log a success message if the connection is established.
        console.log('MongoDB connected successfully!');
        // Start the Express server only after a successful database connection.
        // This ensures your application doesn't try to operate without a database.
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        // Log any connection errors.
        console.error('MongoDB connection error:', err);
        // Exit the process with an error code if the database connection fails.
        // This prevents the application from running in a broken state.
        process.exit(1);
    });
