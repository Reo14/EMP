const mongoose = require('mongoose');

const onboardingApplicationSchema = new mongoose.Schema({
    employeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    hrID: { type: mongoose.Schema.Types.ObjectId, ref: 'HR' },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    feedback: String,
    // Other onboarding application details
    // ...
  });

const OnboardingApplication = mongoose.model('OnboardingApplication', onboardingApplicationSchema);

module.exports = OnboardingApplication;

