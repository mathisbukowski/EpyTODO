const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');
const findIdByEmail = require('../../utils/findIdByEmail');

router.get('/user/todos', verifyToken, (req, res) => {
    const userEmail = req.user.id;

    findIdByEmail(userEmail, (err, userId) => {
        if (err) {
            return res.status(500).json({msg: "Internal Server Error"});
        }
        if (err === 'Not found') {
            return res.status(404).json({msg: "Not found"});
        }
        db.query('SELECT * FROM todo WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: "Internal Server Error"});
            }
            if (results.length === 0) {
                return res.status(200).json(results);
            } else {
                res.status(200).json(results);
            }
        });
    });
})

module.exports = router;