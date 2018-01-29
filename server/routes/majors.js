const express = require('express');
const router = express.Router();
const Majors = require('../models/major');

router.get('/', function(req, res, next) {
  Majors.find((err, majors) => {
    if (err) {
      throw err;
    }
    res.json(majors);
  });
});

router.post('/', function(req, res, next) {
  let input = req.body;

  Majors.create(input, (err, majors) => {
    if (err) {
      throw err;
    }
    res.json(input);
  });
});

module.exports = router;
