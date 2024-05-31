const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');

router.get("/todos", verifyToken, (req, res) => {
    db.query('SELECT * FROM todo', (err, results) => {
        if (err) {
            return res.status(500).send({msg: "Internal Server Error"});
        }
        if (results.length === 0) {
            return res.status(200).json(results);
        }
        res.status(200).json(results);
    })
})

module.exports = router;