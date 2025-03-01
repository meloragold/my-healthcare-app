const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("task", "root", "melora2006", {
  host: "localhost",
  dialect: "mysql", // Change this based on your database: 'postgres', 'sqlite', 'mssql'
  logging: console.log, // Optional: Set to 'false' to disable logging
});

module.exports = sequelize;
