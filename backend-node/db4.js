const { Sequelize } = require("sequelize");

const db = new Sequelize("discharge_records", "root", "melora2006", {
  host: "localhost",
  dialect: "mysql", // Or your preferred database
});

module.exports = db;
