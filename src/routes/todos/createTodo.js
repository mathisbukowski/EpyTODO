const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');

router.post("/todos", verifyToken, (req, res) => {
    const { title, description, due_time, status, user_id } = req.body;

    if (!title || !description || !due_time || !status || !user_id) {
        return res.status(400).send({ msg: "Bad parameter" });
    }
    db.query('SELECT * FROM todo WHERE title = ?', [title], (err, results) => {
        if (err) {
            return res.status(500).send({ msg: "Internal Server Error" });
        } else if (results.length > 0) {
            return res.status(409).send({ msg: "Todo already exists" });
        } else {
            db.query("INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)",
            [title, description, due_time, status, user_id], (err, results) => {
                if (err) {
                    return res.status(500).send({ msg: "Internal Server Error" });
                }
                const id_task = results.insertId;
                db.query('SELECT * FROM `todo` WHERE id = ?', [id_task], (err, results) => {
                    if (err) {
                        return res.status(500).send({ msg: "Internal Server Error" });
                    }
                    res.status(201).json(results[0]);
                });
            });
        }
    });
});


module.exports = router;