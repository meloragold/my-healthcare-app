// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db2 = require("./db2"); // Workload DB
const dbVitals = require("./db3"); // Vitals DB
const dbDischarge = require("./db4"); // Discharge Summary DB
const dbAlerts = require("./db5"); // SOS Alerts DB
const dbTasks = require("./db6"); // Tasks DB (new addition)

const Workload = require("./models/Workload");
const Vitals = require("./models/Vitals");
const DischargeSummary = require("./models/DischargeSummary");
const SOSAlert = require("./models/SOSAlert");
const Task = require("./models/Task"); // Task Model

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const patients = [
  { id: 1, name: "John Doe", room: "701", age: 65, condition: "Diabetes" },
  { id: 2, name: "Emma Wilson", room: "702", age: 45, condition: "Hypertension" },
  { id: 3, name: "Michael Brown", room: "703", age: 78, condition: "Cardiac Issue" },
];

// Sync models with the database
Vitals.sync({ alter: true });
Workload.sync({ alter: true });
DischargeSummary.sync({ alter: true });
SOSAlert.sync({ alter: true });
Task.sync({ alter: true }); // Sync Task Model

// API Route for Static Patient Data
app.get("/api/patients", (req, res) => {
  res.json(patients);
});

// API Route for Workload Data
app.get("/api/workload", async (req, res) => {
  try {
    const workloadData = await Workload.findAll();
    res.json(workloadData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workload data" });
  }
});

// API Route for Vitals Data
app.get("/api/vitals", async (req, res) => {
  try {
    const vitalsData = await Vitals.findAll();
    res.json(vitalsData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vitals data" });
  }
});

// API Route for specific patient vitals
app.get("/api/vitals/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const vitals = await Vitals.findAll({ where: { user_id } });
    res.json(vitals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient vitals" });
  }
});

// Add new vitals entry
app.post("/api/vitals", async (req, res) => {
  const { user_id, bp, hr, temperature } = req.body;
  try {
    const newVital = await Vitals.create({ user_id, bp, hr, temperature });
    res.status(201).json(newVital);
  } catch (error) {
    res.status(500).json({ error: "Failed to add vitals" });
  }
});

// API Route for Discharge Summary
app.get("/api/discharge", async (req, res) => {
  try {
    const dischargeData = await DischargeSummary.findAll();
    res.json(dischargeData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch discharge summary data" });
  }
});

// Add new discharge summary entry
app.post("/api/discharge", async (req, res) => {
  const { user_id, summary, doctor_name, discharge_date } = req.body;
  try {
    const newDischarge = await DischargeSummary.create({ user_id, summary, doctor_name, discharge_date });
    res.status(201).json(newDischarge);
  } catch (error) {
    res.status(500).json({ error: "Failed to add discharge summary" });
  }
});

// API Route for SOS Alerts
app.post("/api/alerts", async (req, res) => {
  const { staff_id, alert_type, message, location } = req.body;
  try {
    const newAlert = await SOSAlert.create({ staff_id, alert_type, message });
    console.log("Real-time Location:", location);
    res.status(201).json({ message: "SOS alert sent!", alertId: newAlert.id, locationReceived: location });
  } catch (error) {
    res.status(500).json({ error: "Failed to send SOS alert" });
  }
});

// Task Management API
// Fetch all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add a new task
app.post("/api/tasks", async (req, res) => {
  const { title, description, assigned_to, due_date, status } = req.body;
  try {
    const newTask = await Task.create({ title, description, assigned_to, due_date, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, assigned_to, due_date, status } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.update({ title, description, assigned_to, due_date, status });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Database connection tests
db2.authenticate()
  .then(() => console.log("Workload DB connected!"))
  .catch((err) => console.error("Workload DB connection error:", err));

dbVitals.authenticate()
  .then(() => console.log("Vitals DB connected!"))
  .catch((err) => console.error("Vitals DB connection error:", err));

dbDischarge.authenticate()
  .then(() => console.log("Discharge Summary DB connected!"))
  .catch((err) => console.error("Discharge Summary DB connection error:", err));

dbAlerts.authenticate()
  .then(() => console.log("SOS Alerts DB connected!"))
  .catch((err) => console.error("SOS Alerts DB connection error:", err));

dbTasks.authenticate()
  .then(() => console.log("Tasks DB connected!"))
  .catch((err) => console.error("Tasks DB connection error:", err));

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
