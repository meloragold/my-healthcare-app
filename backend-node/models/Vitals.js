const { DataTypes } = require("sequelize");
const dbVitals = require("../db3");

const Vitals = dbVitals.define(
  "Vitals",
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    bp: { type: DataTypes.STRING, allowNull: true },
    hr: { type: DataTypes.INTEGER, allowNull: true },
    temperature: { type: DataTypes.DECIMAL(4, 1), allowNull: true },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "vitals",
    timestamps: false,
  }
);

module.exports = Vitals;
