const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  president: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
  logo: {
    type: String, // URL or image path
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  // 🆕 Added fields
  category: {
    type: String,
    enum: ['Tech', 'Arts', 'Cultural', 'Sports', 'Other'],
    default: 'Other',
  },
  socialLinks: {
    website: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Organization', organizationSchema);
