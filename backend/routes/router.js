const express = require("express");
const router = express.Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {signin, signup} = require('../controllers/auth');
const {
    submitOnboardingApplication,
    getOnboardingApplicationStatus,
    createPersonalInformation,
    getPersonalInformation,
    editPersonalInformation,
  } = require('../controllers/employeeControllers');
const { createEmergencyContact, getAllEmergencyContacts, updateEmergencyContact, deleteEmergencyContact } = require('../controllers/emergenceControllers');
const { createReference, getReference, updateReference } = require('../controllers/referenceControllers');
const {
    getAllEmployeeSummaries,
    generateRegistrationToken,
    getRegistrationTokenHistory,
    processOnboardingApplication,
    getAllOnboardingApplications,
    getOnboardingApplicationsByStatus
  } = require('../controllers/hrControllers')

// 请根据前端的实际需要修改此处的router 


// Auth Flow
router.post("/sign-up", verifyToken, signup);
router.post("/sign-in", signin);
// router.post('/logout', logout)
// router.post("/update-pwd", updatePassword);

// Employee Flow
router.post("submit-onboardingapplication", submitOnboardingApplication );
router.get("status/:id", getOnboardingApplicationStatus)
router.get("personal-information/:id", getPersonalInformation);
router.put("personal-information/:id/edit", editPersonalInformation);
router.post("personal-information/:id/create", createPersonalInformation);

// Emergence Contact Flow
router.get("emergence-contact/:id", getAllEmergencyContacts);
router.post("emergence-contact/:id/create", createEmergencyContact);
router.put("emergence-contact/:id/edit", updateEmergencyContact);
router.delete("emergence-contact/:id/delete", deleteEmergencyContact);

// Reference Flow
router.get("reference/:id", getReference);
router.post("reference/:id/create", createReference);
router.put("reference/:id/edit", updateReference);
// 由于reference的数量只能为1 我没有设置delete函数

// HR Flow
router.get("hr/all-employees", getAllEmployeeSummaries);
router.post("hr/registration/send", generateRegistrationToken);
router.get("hr/registration/history", getRegistrationTokenHistory);
router.get("hr/onboardapplication", getAllOnboardingApplications)
router.put("hr/onboardapplication/process", processOnboardingApplication)

module.exports = router;