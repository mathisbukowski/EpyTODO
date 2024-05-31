const db = require('../db/db');

const findIdByEmail = (email, callback) => {
    db.query('SELECT id FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (results.length > 0) {
            const userId = results[0].id;
            callback(null, userId);
        } else {
            callback(new Error('Not found'), null);
        }
    })
}

module.exports = findIdByEmail;