// src/components/TaskList.jsx
// This component displays a list of tasks and provides actions like marking complete or deleting.

import React from 'react';

function TaskList({ tasks, onTaskAction, title, emptyMessage }) {
  // Function to handle marking a task as complete
  const handleComplete = async (id) => {
    // Call the parent's onTaskAction with 'complete' action and task ID
    await onTaskAction(id, 'complete');
  };

  // Function to handle deleting a task
  const handleDelete = async (id) => {
    // Call the parent's onTaskAction with 'delete' action and task ID
    await onTaskAction(id, 'delete');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>

      {/* Display message if no tasks are available */}
      {tasks.length === 0 ? (
        <p className="text-gray-600 italic">{emptyMessage}</p>
      ) : (
        // List of tasks
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id} // Unique key for each list item
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-md bg-gray-50"
            >
              <div className="flex-grow mb-2 sm:mb-0">
                {/* Task Title */}
                <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {/* Task Description (if available) */}
                {task.description && (
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                )}
                {/* Task Priority */}
                <span
                  className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mt-2
                    ${task.priority === 'High' ? 'bg-red-100 text-red-800' : ''}
                    ${task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${task.priority === 'Low' ? 'bg-green-100 text-green-800' : ''}
                  `}
                >
                  {task.priority} Priority
                </span>
                {/* Task Status and Dates */}
                <p className="text-xs text-gray-500 mt-1">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                  {task.status === 'completed' && task.completedAt && (
                    <span> | Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-3 sm:mt-0">
                {/* Complete Button (only for pending tasks) */}
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleComplete(task._id)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
                  >
                    Complete
                  </button>
                )}
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
