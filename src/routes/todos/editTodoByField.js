const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');

router.patch("/todos/:id", verifyToken, (req, res) => {

    const id = req.params.id;
    const { title, description, status, user_id } = req.body;
    const updates = {};

    if (title)
        updates.title = title;
    if (description)
        updates.description = description;
    if (status)
        updates.status = status;
    if (user_id)
        updates.user_id = user_id;

    const setAdding = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    if (!setAdding.length) {
        return res.status(400).send({msg: "Bad parameter"});
    }
    db.query(`UPDATE todo SET ${setAdding} WHERE id = ?`, [...Object.values(updates), id], (err, results) => {
        if (err) {
            return res.status(500).send({ msg: "Internal Server Error"});
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ msg: "Not found" });
        }
        db.query(`SELECT * FROM todo WHERE id = ?`, [id], (err, results) => {
            if (err) {
                return res.status(500).send({ msg: "Internal Server Error"});
            }
            if (results.length === 0) {
                return res.status(404).send({ msg: "Not found" });
            }
            return res.status(200).send(results[0]);
        })
    })
})

module.exports = router;