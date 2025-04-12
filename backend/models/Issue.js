const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  image: String,
  location: String,
  department: String,
  dateTime: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Issue', issueSchema);
