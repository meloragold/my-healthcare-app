const { Sequelize } = require("sequelize");

const db5 = new Sequelize("emergency_alerts", "root", "melora2006", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db5;
