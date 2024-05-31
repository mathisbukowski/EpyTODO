const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => { // Remarquez que 'req' vient en premier
    const { email, name, firstname, password} = req.body;

    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({msg: "Internal Server Error."});
        }
        if (results.length > 0) {
            return res.status(409).json({msg: "Account already exists"})
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ msg: "Internal Server Error" });
            }
            db.query('INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)', [email, name, firstname, hash], (err, results) => {
                if (err) {
                    return res.status(500).json({ msg: "Internal Server Error" });
                }
                const token = jwt.sign({ email }, process.env.SECRET);
                return res.status(201).json({ "token": token });
            });
        });
    });
});

module.exports = router;