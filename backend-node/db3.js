const { Sequelize } = require("sequelize");

// Vitals Database (MySQL)
const dbVitals = new Sequelize("health_monitoring", "root", "melora2006", {
  host: "localhost",
  dialect: "mysql",
});

// Test connection
const testVitalsConnection = async () => {
  try {
    await dbVitals.authenticate();
    console.log("Vitals DB connected!");
  } catch (error) {
    console.error("Vitals DB connection error:", error);
  }
};

testVitalsConnection();

module.exports = dbVitals;
