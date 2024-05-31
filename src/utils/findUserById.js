const db = require('../db/db');

const findUserById = (id, callback) => {
     db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
         if (err) {
             callback({ msg: "Internal Server Error"}, null);
         } else if (results.length === 1) {
             callback(null, results[0]);
         } else if (results.length > 1) {
             callback({msg: "Internal Server Error"}, null);
         } else if (results.length === 0) {
             callback(null, null);
         } else {
             callback({msg: "Invalid Credentials"}, null);
         }
     })
}

module.exports = findUserById;