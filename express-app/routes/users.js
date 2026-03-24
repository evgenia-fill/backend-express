const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.json({
    items: [
      { id: 1, name: "Степа" },
      { id: 2, name: "Женя" },
    ]
  });
});

router.post('/', function(req, res, next) {
  const newUser = req.body;
  newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
