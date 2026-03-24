const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydb.db");
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

let users = [
    {
        id: 1,
        name: "Valeria",
    },
    {
        id: 2,
        name: "Egor",
    },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

router.get("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

router.post("/", (req, res) => {
    const newUser = req.body;
    const insert = "INSERT INTO users (name) VALUES (?)";

    db.run(insert, [newUser["name"]]);

    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;