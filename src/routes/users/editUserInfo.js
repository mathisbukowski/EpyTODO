const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');

router.put("/users/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    const { email, password, firstname, name } = req.body;

    if (!email || !password || !firstname || !name) {
        return res.status(400).send({ msg: "Bad parameter" });
    }

    db.query("UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?", [email, password, firstname, name, id], (err, results) => {
        if (err) {
            return res.status(500).send({ msg: "Internal Server Error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ msg: "Not found" });
        }
        db.query("SELECT * FROM user WHERE id = ?", [id], (err, results) => {
            if (err) {
                return res.status(500).json({ msg: "Internal Server Error" });
            }
            if (results.length === 0) {
                return res.status(200).json(results[0]);
            }
            res.status(200).json(results[0]);
        });
    });
});

module.exports = router;