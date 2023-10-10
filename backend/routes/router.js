const express = require("express");
const router = express.Router();

const {
    generateRegistrationToken,
    submitOnboardingApplication,
    getPersonalInformation,
    editPersonalInformation,
    manageVisaStatus,
  } = require('../controllers/employeeControllers');
const { createEmergencyContact, getAllEmergencyContacts } = require('../controllers/emergenceControllers');
const { createReference, getAllReferences } = require('../controllers/referenceControllers');
const {
    getAllEmployeeSummaries,
    getVisaStatusEmployees,
    generateRegistrationToken,
    getRegistrationTokenHistory,
    processOnboardingApplication,
    getAllOnboardingApplications,
    getOnboardingApplicationsByStatus
  } = require('../controllers/hrControllers')




module.exports = router;