import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMicrophone, FaTasks, FaRegHospital, FaUserCog } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { MdMedication } from "react-icons/md";

export default function HomeScreen() {
  const location = useLocation(); // Get current path to highlight active button
  const [darkMode, setDarkMode] = useState(false);

  // Dummy patient data (Replace with API call later if needed)
  const patients = [
    { id: 1, name: "John Doe", room: "701", age: 65, priority: "high" },
    { id: 2, name: "Emma Wilson", room: "702", age: 45, priority: "stable" },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen p-4`}>
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md">
        <div>
          <h2 className="text-xl font-bold">Hello, Sarah</h2>
          <p className="text-gray-500">Night Shift · Ward 7</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-around mt-4">
        <Link to="/voice-notes">
          <button className="bg-blue-100 p-4 rounded-xl flex flex-col items-center">
            <FaMicrophone className="text-blue-500 text-2xl" />
            <p className="text-xs mt-2">Voice Notes</p>
          </button>
        </Link>

        <Link to="/tasks">
          <button className="bg-green-100 p-4 rounded-xl flex flex-col items-center">
            <FaTasks className="text-green-500 text-2xl" />
            <p className="text-xs mt-2">Tasks</p>
          </button>
        </Link>

        <Link to="/patient-details">
          <button className="bg-yellow-100 p-4 rounded-xl flex flex-col items-center">
            <MdMedication className="text-yellow-500 text-2xl" />
            <p className="text-xs mt-2">Patients</p>
          </button>
        </Link>

        <button className="bg-red-100 p-4 rounded-xl flex flex-col items-center">
          <IoMdHelpCircle className="text-red-500 text-2xl" />
          <p className="text-xs mt-2">AI Help</p>
        </button>
      </div>

      {/* My Patients (Dynamic) */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">My Patients</h3>
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white p-4 rounded-xl shadow-md mt-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold">{patient.name}</h4>
                <p className="text-gray-500 text-sm">Room {patient.room} · Age {patient.age}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  patient.priority === "high" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`}
              >
                {patient.priority === "high" ? "High Priority" : "Stable"}
              </span>
            </div>
            <div className="flex mt-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs mr-2">Meds Due</button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-xs">Records</button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around p-3">
        <Link to="/">
          <button className={`flex flex-col items-center ${location.pathname === "/" ? "text-blue-500" : "text-gray-400"}`}>
            <FaRegHospital className="text-2xl" />
            <p className="text-xs">Home</p>
          </button>
        </Link>

        <Link to="/tasks">
          <button className={`flex flex-col items-center ${location.pathname === "/tasks" ? "text-blue-500" : "text-gray-400"}`}>
            <FaTasks className="text-2xl" />
            <p className="text-xs">Tasks</p>
          </button>
        </Link>

        <Link to="/patient-details">
          <button className={`flex flex-col items-center ${location.pathname === "/patient-details" ? "text-blue-500" : "text-gray-400"}`}>
            <MdMedication className="text-2xl" />
            <p className="text-xs">Patients</p>
          </button>
        </Link>

        <Link to="/settings">
          <button className="text-gray-400 flex flex-col items-center">
            <FaUserCog className="text-2xl" />
            <p className="text-xs">Settings</p>
          </button>
        </Link>
      </div>

      {/* Settings Modal */}
      {location.pathname === "/settings" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="flex items-center justify-between mb-4">
              <p>Dark Mode</p>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-3 py-1 rounded-full ${darkMode ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              >
                {darkMode ? "On" : "Off"}
              </button>
            </div>
            <Link to="/">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Close Settings</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
