const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');

router.get('/user', verifyToken, (req, res) => {
    const userEmail = req.user.id;

    db.query('SELECT * FROM user WHERE email = ?', [userEmail] , (err, results) => {
        if (err) {
            return res.status(500).json({msg: "Internal Server Error"});
        }
        if (results.length === 0) {
            return res.status(404).json({msg: "Not found"});
        }
        res.status(200).json(results[0]);
    })
})

module.exports = router;