const mongoose = require('mongoose');

const schema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: { type: String, required: true },
  insertedAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Message', schema);
