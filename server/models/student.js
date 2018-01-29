const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  gender: Boolean,
  birthday: Date,
  majors: [],
  create_at: {
    type: Date,
    default: Date.now
  }
});