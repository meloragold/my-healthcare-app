const { Sequelize } = require("sequelize");

const db2 = new Sequelize("workload_monitoring", "root", "melora2006", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db2;
