const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    registrationToken: { type: String, unique: true, required: true },
    onboardingApplication: { type: mongoose.Schema.Types.ObjectId, ref: 'OnboardingApplication' },
    emergencyContact: { type: mongoose.Schema.Types.ObjectId, ref: 'EmergencyContact' },
    reference: { type: mongoose.Schema.Types.ObjectId, ref: 'Reference' },
    // Other employee details
    // ...
  });
  
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;