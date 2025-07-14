// src/components/TaskForm.jsx
// This component provides a form for users to add new tasks.

import React, { useState } from 'react';

function TaskForm({ onTaskAdded }) {
  // State to manage form input values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default priority
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null); // Error state for API calls

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      // Send a POST request to your backend API to add a new task
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify({ title, description, priority }), // Send form data as JSON
      });

      // Check if the response was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add task');
      }

      const data = await response.json(); // Parse the JSON response

      console.log('Task added:', data.data); // Log the added task data
      onTaskAdded(data.data); // Call the callback function passed from parent (App.jsx)
                             // to update the task list in the parent component.

      // Clear the form fields after successful submission
      setTitle('');
      setDescription('');
      setPriority('Medium');
    } catch (err) {
      console.error('Error adding task:', err.message);
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Task</h2>

      {/* Display error message if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Task Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required // Make title a required field
          disabled={loading} // Disable input while loading
        />
      </div>

      {/* Task Description Input */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description (Optional):
        </label>
        <textarea
          id="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3" // Set number of rows for textarea
          disabled={loading} // Disable input while loading
        ></textarea>
      </div>

      {/* Task Priority Select */}
      <div className="mb-6">
        <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">
          Priority:
        </label>
        <select
          id="priority"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={loading} // Disable select while loading
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out w-full"
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
