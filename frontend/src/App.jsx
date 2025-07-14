// src/App.jsx
// This is the main application component for your React frontend.

function App() {
  return (
    // Tailwind CSS classes for basic styling:
    // min-h-screen: Minimum height of the screen
    // bg-gray-100: Light gray background
    // flex: Use flexbox for layout
    // items-center: Vertically center content
    // justify-center: Horizontally center content
    // p-4: Padding on all sides
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <h1 className="text-4xl font-bold text-blue-600">
        Task Tracker Frontend
      </h1>
    </div>
  );
}

export default App; // Export the App component as default
