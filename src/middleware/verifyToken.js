const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.status(498).json({ msg: "No token, authorization denied" });
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.status(498).json({ msg: "Token is not valid" });
        }
        req.user = user;
        next();
    })
}

module.exports = verifyToken;