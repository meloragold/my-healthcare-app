const { DataTypes } = require("sequelize");
const db2 = require("../db2");

const Workload = db2.define(
  "Workload",
  {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    staff_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    workload_level: { 
      type: DataTypes.ENUM('low', 'moderate', 'high') 
    },
    suggested_break_time: { 
      type: DataTypes.TIME 
    },
    timestamp: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW 
    },
  },
  {
    tableName: "workload", // Make sure the table name is correct
    timestamps: false,     // Because you already have a timestamp column
  }
);

module.exports = Workload;
