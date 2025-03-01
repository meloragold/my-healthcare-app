import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import HomeScreen from "./pages/Home";
import PatientDetails from "./pages/PatientDetails";
import VoiceNotes from "./pages/VoiceNotes";
import VoiceToText from "./pages/VoiceToText";
import WorkloadMonitoring from "./pages/WorkloadMonitoring";
import VitalsDashboard from "./pages/VitalsDashboard";
import DischargeSummary from "./pages/DischargeSummary";
import SosDashboard from "./pages/SOSDashboard";
import Tasks from "./pages/Tasks";
import Chatbot from "./pages/Chatbot";
import MedicationManagement from "./pages/MedicationManagement";

import "./index.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}>
        <div className="flex min-h-screen">
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
          />

          <div className="flex-1 p-6 transition-all relative">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/patient-details" element={<PatientDetails />} />
              <Route path="/voice-notes" element={<VoiceNotes />} />
              <Route path="/voice-to-text" element={<VoiceToText />} />
              <Route path="/workload-monitoring" element={<WorkloadMonitoring />} />
              <Route path="/vitals-dashboard" element={<VitalsDashboard />} />
              <Route path="/discharge-summary" element={<DischargeSummary />} />
              <Route path="/sos-dashboard" element={<SosDashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/medication-management" element={<MedicationManagement />} />
            </Routes>

            <Chatbot />
          </div>
        </div>
      </div>
    </Router>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen, darkMode, toggleDarkMode }) {
  const location = useLocation();

  return (
    <div className={`relative bg-gray-800 text-white w-64 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 right-[-2.5rem] md:hidden p-2 bg-gray-700 text-white rounded-md"
      >
        <FaBars />
      </button>
      <div className="p-5">
        <h2 className="text-2xl font-bold">🏥 Healthcare App</h2>
        <nav className="mt-5 space-y-4">
          <SidebarLink to="/" label="🏠 Home" currentPath={location.pathname} />
          <SidebarLink to="/patient-details" label="📋 Patient Details" currentPath={location.pathname} />
          <SidebarLink to="/voice-notes" label="🎤 Voice Notes" currentPath={location.pathname} />
          <SidebarLink to="/voice-to-text" label="🗣 Voice to Text" currentPath={location.pathname} />
          <SidebarLink to="/workload-monitoring" label="📊 Workload Monitoring" currentPath={location.pathname} />
          <SidebarLink to="/vitals-dashboard" label="❤️ Vitals Dashboard" currentPath={location.pathname} />
          <SidebarLink to="/discharge-summary" label="📄 Discharge Summary" currentPath={location.pathname} />
          <SidebarLink to="/sos-dashboard" label="🚨 SOS Alerts" currentPath={location.pathname} />
          <SidebarLink to="/tasks" label="📅 Task Scheduler" currentPath={location.pathname} />
          <SidebarLink to="/medication-management" label="💊 Medication Management" currentPath={location.pathname} />
        </nav>
        <button onClick={toggleDarkMode} className="mt-5 flex items-center gap-2 bg-gray-700 px-4 py-2 rounded">
          {darkMode ? <FaSun /> : <FaMoon />} Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}

function SidebarLink({ to, label, currentPath }) {
  const isActive = currentPath === to;
  return (
    <Link to={to} className={`block px-4 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
      {label}
    </Link>
  );
}

// 🚀 Cleaned up the backend status line! Let me know if anything else needs tweaking! 🚀
