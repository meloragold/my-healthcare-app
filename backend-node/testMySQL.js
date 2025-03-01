const pool = require("./db"); // Correct path to db.js

async function testMySQLConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ MySQL is connected successfully!", rows);
  } catch (error) {
    console.error("❌ Error testing MySQL connection:", error);
  } finally {
    pool.end();
  }
}

testMySQLConnection();
