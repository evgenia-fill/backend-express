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

module.exports = router;
