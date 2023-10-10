const mongoose = require('mongoose');

const hrSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: ['Employee', 'HR'], default: 'HR' },
    onboardingApplication: { type: mongoose.Schema.Types.ObjectId, ref: 'OnboardingApplication' },
    // Other HR details
    // ...
  });

const HR = mongoose.model('HR', hrSchema);

module.exports = HR;
