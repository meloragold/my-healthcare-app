const { DataTypes } = require("sequelize");
const db5 = require("../db5");

const SOSAlert = db5.define(
  "SOSAlert",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alert_type: {
      type: DataTypes.ENUM("medical", "security", "other"),
    },
    message: {
      type: DataTypes.TEXT,
    },
    alert_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "sos_alerts",
    timestamps: false,
  }
);

module.exports = SOSAlert;
