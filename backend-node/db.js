const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Change this if you set a different MySQL username
  password: "melora2006", // Use your actual MySQL password
  database: "healthcare_app", // Name of the database (create it in MySQL)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Convert pool into a Promise-based version
const promisePool = pool.promise();

module.exports = promisePool;
