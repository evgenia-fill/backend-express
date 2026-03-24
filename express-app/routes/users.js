const express = require('express');
const router = express.Router();

// Массив для хранения пользователей
const users = [
    {id: 1, name: "Степа"},
    {id: 2, name: "Женя"},
];

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users
        (
            id
            INTEGER
            PRIMARY
            KEY
            AUTOINCREMENT,
            name
            text
        )`);

router.get('/', function (req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});


router.post('/', function (req, res, next) {
    const newUser = req.body;
    const insert = "INSERT INTO users (newUser.name) VALUES (?)";
    db.run(insert, [newUser.name]);
    res.status(201).json(newUser);
});

module.exports = router;


router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    db.all("SELECT id, name FROM users", [id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }

        res.json(row);
    });
});