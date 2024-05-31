const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');

router.put("/todos/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    const { title, description, status, user_id} = req.body;

    if (!title || !description || !status || !user_id) {
        return res.status(400).send({ msg: "Bad parameter" });
    }
    db.query("UPDATE todo SET title = ?, description = ?, status = ? , user_id = ? WHERE id = ?", [title, description, status, user_id, id], (err, results) => {
        if (err) {
            return res.status(500).send({ msg: "Internal Server Error"})
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ msg: "Not found" });
        }
        db.query("SELECT * FROM todo WHERE id = ?", [id], (err, updatedResults) => {
                if (err) {
                    return res.status(500).send({ msg: "Internal Server Error "});
                }
                return res.status(200).send(updatedResults[0]);
            }
        );
    });
})

module.exports = router;