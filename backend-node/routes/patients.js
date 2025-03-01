const express = require("express");
const router = express.Router();
const pool = require("../db"); // PostgreSQL connection

// Get all patients
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM patients");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
