const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 0) {
            return res.status(404).send('Not found');
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json('Internal Server Error');
            }
            if (isMatch) {
                const token = jwt.sign({ id: user.email }, process.env.SECRET);
                return res.status(200).json({ "token": token });
            } else {
                return res.status(401).send('Invalid Credentials');
            }
        })
    })
});

module.exports = router;