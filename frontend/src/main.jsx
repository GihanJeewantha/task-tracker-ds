// src/main.jsx
// This file is the entry point for your React application.
// It renders the root App component into the HTML document.

import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import App from './App.jsx'; // Import your main App component
import './index.css'; // Import your Tailwind CSS styles

// Create a React root and render the App component into the element with id 'root' in index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>,
);
