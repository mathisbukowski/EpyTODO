const db = require('../db/db')
const validateEmail = require('./isEmail');

const findUserByEmail = (email, callback) => {
    if (validateEmail(email)) {
        db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
            if (err) {
                callback({ msg: "Internal Server Error"}, null);
            } else if (results.length === 1) {
                callback(null, results[0]);
            } else if (results.length > 1) {
                callback({msg: "Internal Server Error"}, null);
            } else {
                callback(null, null);
            }
        });
    } else {
        callback({msg: "Invalid Credentials."}, null);
    }
};

module.exports = findUserByEmail;