const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');

router.patch("/users/:id", verifyToken, (req, res) => {

    const id = req.params.id;
    const { email, password, firstname, name } = req.body;
    const updates = {};

    if (email)
        updates.email = email;
    if (firstname)
        updates.firstname = firstname;
    if (name)
        updates.name = name;
    if (password) {
        try {
            const hashedPassword = bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        } catch (err) {
            return res.status(500).send({ msg: "Internal Server Error"});
        }
    }
    const setAdding = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    if (!setAdding.length) {
        return res.status(400).send({msg: "Bad parameter"});
    }
    db.query(`UPDATE user SET ${setAdding} WHERE id = ?`, [...Object.values(updates), id], (err, results) => {
        if (err) {
            return res.status(500).send({ msg: "Internal Server Error"});
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ msg: "Not found" });
        }
        res.status(200).json({ results });
    })
})

module.exports = router;