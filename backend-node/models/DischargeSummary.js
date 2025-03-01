const { DataTypes } = require("sequelize");
const db = require("../db4"); // Adjust path based on your structure

const DischargeSummary = db.define("DischargeSummary", {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  discharge_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = DischargeSummary;
