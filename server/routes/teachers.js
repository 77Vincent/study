const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Teacher.find((err, teachers) => {
    if (err) {
      throw err;
    }
    res.json(teachers);
  });
});

module.exports = router;
