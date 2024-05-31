const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');
const findUserByEmail = require('../../utils/findUserByEmail');
const findUserById = require('../../utils/findUserById');

router.get("/users/:identifier", verifyToken, (req, res) => {
    const identifier = req.params.identifier;

    if (isNaN(identifier)) {
        findUserByEmail(identifier, (error, user) => {
            if (error) {
                res.status(500).send({msg: "Internal Server Error"});
            } else if (!user) {
                res.status(404).send({ msg: "Not found"});
            } else {
                res.status(200).json(user);
            }
        });
    } else {
        findUserById(parseInt(identifier), (error, user) => {
            if (error) {
                res.status(500).send({msg: "Internal Server Error"});
            } else if (!user) {
                res.status(404).send({ msg: "Not found"});
            } else {
                res.status(200).json(user);
            }
        });
    }
});

module.exports = router;