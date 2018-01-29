const express = require('express');
const router = express.Router();
const Teachers = require('../models/teacher');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Teachers.find((err, teachers) => {
    if (err) { throw err; }
    res.json(teachers);
  }).limit(20);
});

router.get('/:id', function(req, res, next) {
  Teachers.findById(req.params.id, (err, teacher) => {
    if (err) { throw err; }
    res.json(teacher);
  }).limit(20);
});

module.exports = router;
