const mongoose = require('mongoose');

const registrationTokenSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    employeeName: String,
    registrationLink: String,
    status: { type: String, enum: ['Submitted', 'Not Submitted'], default: 'Not Submitted' },
    createdAt: { type: Date, default: Date.now },
  });

const RegistrationToken = mongoose.model('RegistrationToken', registrationTokenSchema);

module.exports = RegistrationToken;