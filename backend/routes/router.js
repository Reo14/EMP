const express = require("express");
const router = express.Router();

const {signin, signup} = require('../controllers/auth');
const {
    submitOnboardingApplication,
    getPersonalInformation,
    editPersonalInformation,
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


// Auth Flow
router.post("/sign-up", signup);
router.post("/sign-in", signin);
// router.post('/logout', logout)
// router.post("/update-pwd", updatePassword);

// Employee Flow
router.post("submit-onboardingapplication", submitOnboardingApplication );
router.get("personal-information/:id", getPersonalInformation);
router.get("personal-information/:id/edit", editPersonalInformation)

// Emergence Contact Flow

// HR Flow



module.exports = router;