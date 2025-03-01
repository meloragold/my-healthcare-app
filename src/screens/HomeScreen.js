import React from "react";
import { Link } from "react-router-dom"; // If using React Router

export default function HomeScreen() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🏠 Home</h1>
      <p className="text-lg mb-4">Welcome to Home Screen</p>

      {/* Navigation Links */}
      <div className="space-y-2">
        <Link to="/patient-details" className="block bg-blue-500 text-white px-4 py-2 rounded">
          📋 Patient Details
        </Link>
        <Link to="/task-scheduling" className="block bg-green-500 text-white px-4 py-2 rounded">
          🗓 Task Scheduling
        </Link>
        <Link to="/voice-notes" className="block bg-purple-500 text-white px-4 py-2 rounded">
          🎤 Voice Notes
        </Link>
      </div>
    </div>
  );
}
