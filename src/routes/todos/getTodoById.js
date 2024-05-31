const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');
const findTodoById = require('../../utils/findTodoById');

router.get("/todos/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    if (!isNaN(parseInt(id))) {
        findTodoById(parseInt(id), (error, todo) => {
            if (error) {
                if (error.msg === "Not found") {
                    res.status(404).send({ msg: "Not found" });
                } else if (error.msg === "Todo exists 2 times") {
                    res.status(409).send({ msg: "Todo already exists" });
                } else {
                    res.status(500).send({ msg: "Internal Server Error" });
                }
            } else {
                res.status(200).json(todo);
            }
        });
    } else {
        res.status(400).send({ msg: "Bad parameter" });
    }
})

module.exports = router;