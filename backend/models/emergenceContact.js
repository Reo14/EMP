const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    employeeId: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: String,
    phone: String,
    email: String,
    relationship: {type:String, required: true}
  });

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);

module.exports = EmergencyContact;
