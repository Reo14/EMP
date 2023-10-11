const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: String,
    phone: String,
    email: String,
    relationship: String,
  });

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);

module.exports = EmergencyContact;
