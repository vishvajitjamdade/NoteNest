// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Note', noteSchema);
