const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  followedOrganizations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  role: {
    type: String,
    enum: ['student', 'organizer', 'admin'],
    default: 'student'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
