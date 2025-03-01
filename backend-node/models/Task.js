const { DataTypes } = require("sequelize");
const sequelize = require("../db6"); // Ensure this file exports a valid Sequelize instance

if (!sequelize) {
    console.error("Sequelize instance is not defined!");
}

const Task = sequelize.define("Task", { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
        defaultValue: "medium"
    },
    due_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    reminder_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false, // Since we already have `created_at`, we disable auto timestamps
    tableName: "tasks"
});

module.exports = Task;
