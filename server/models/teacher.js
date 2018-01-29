const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  gender: Boolean,
  birthday: Date,
  create_at: {
    type: Date,
    default: Date.now
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;