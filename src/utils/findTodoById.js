const db = require('../db/db');

const findTodoById = (id, callback) => {
    db.query('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
        if (err) {
            callback({ msg: "Internal Server Error"}, null);
        } else if (results.length === 1) {
            callback(null, results[0]);
        } else if (results.length > 1) {
            callback({msg: "Todo exists 2 times"}, null);
        } else {
            callback({msg: "Not found"}, null);
        }
    })
}

module.exports = findTodoById;