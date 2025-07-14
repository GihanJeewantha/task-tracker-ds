// src/App.jsx
// This is the main application component that integrates TaskForm and TaskList,
// manages the application state, and handles communication with the backend API.

import React, { useState, useEffect, useCallback } from 'react'; // Import necessary React hooks
import TaskForm from './components/TaskForm'; // Import the TaskForm component
import TaskList from './components/TaskList'; // Import the TaskList component

function App() {
  // State to store all tasks fetched from the backend
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for initial data fetch
  const [error, setError] = useState(null); // Error state for API operations

  // Function to fetch all tasks from the backend API
  const fetchTasks = useCallback(async () => {
    setLoading(true); // Set loading state before fetching
    setError(null); // Clear any previous errors
    try {
      const response = await fetch('http://localhost:5000/api/tasks'); // Fetch from backend
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.data.allTasks); // Update tasks state with fetched data
    } catch (err) {
      console.error('Error fetching tasks:', err.message);
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Reset loading state after fetch
    }
  }, []); // Empty dependency array means this function is created once

  // useEffect hook to fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Re-run if fetchTasks changes (though useCallback prevents this)

  // Function to handle actions (complete or delete) on a task
  const handleTaskAction = async (id, actionType) => {
    setError(null); // Clear previous errors
    try {
      let response;
      if (actionType === 'complete') {
        // Send PUT request to mark task as complete
        response = await fetch(`http://localhost:5000/api/tasks/${id}/complete`, {
          method: 'PUT',
        });
      } else if (actionType === 'delete') {
        // Send DELETE request to delete task
        response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
          method: 'DELETE',
        });
      } else {
        throw new Error('Invalid task action');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${actionType} task`);
      }

      // After successful action, re-fetch all tasks to update the UI
      fetchTasks();
    } catch (err) {
      console.error(`Error ${actionType}ing task:`, err.message);
      setError(err.message); // Set error message
    }
  };

  // Filter tasks into pending and completed lists for display
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    // Main container with responsive flex layout
    <div className="min-h-screen bg-gray-100 p-4 font-inter text-gray-800">
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-8">
        Task Tracker
      </h1>

      {/* Display global error message if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-auto max-w-2xl" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Main content area: Task Form and Task Lists */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 items-start justify-center">
        {/* Task Form section */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <TaskForm onTaskAdded={fetchTasks} /> {/* Pass fetchTasks as callback */}
        </div>

        {/* Task Lists section */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-8">
          {loading ? (
            <p className="text-center text-gray-600 text-lg">Loading tasks...</p>
          ) : (
            <>
              {/* Pending Tasks List */}
              <TaskList
                tasks={pendingTasks}
                onTaskAction={handleTaskAction}
                title="Pending Tasks (Queue Concept)"
                emptyMessage="No pending tasks. Time to add some!"
              />

              {/* Completed Tasks List */}
              <TaskList
                tasks={completedTasks}
                onTaskAction={handleTaskAction}
                title="Completed Tasks (Stack Concept)"
                emptyMessage="No completed tasks yet."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
