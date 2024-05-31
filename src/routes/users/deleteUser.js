const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');

router.delete("/users/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).send("Bad parameter");
    }
    db.query('DELETE FROM user WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send({msg: "Internal Server Error"});
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ msg: "Not found" });
        }

        return res.status(200).send({ msg: `Successfully deleted record number : ${id}`});
    })
})

module.exports = router;