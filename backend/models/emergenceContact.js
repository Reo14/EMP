const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    employeeId: String,
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    email: String,
    relationship: String
  });

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);

module.exports = EmergencyContact;
