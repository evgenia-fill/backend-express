const express = require('express');
const router = express.Router();

// Массив для хранения пользователей
const users = [
    {id: 1, name: "Степа"},
    {id: 2, name: "Женя"},
];


router.get('/', function (req, res, next) {
    res.json({
        items: users
    });
});


router.post('/', function (req, res, next) {
    const newUser = req.body;
    newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;


router.get('/:id', function (req, res, next) {
    const params = req.params;
    const user = users.find(x => x.id === params.id);

    if (!user) {
        return res.status(404).send('Not Found');
    }

    res.json(user);
})