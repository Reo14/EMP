const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { signin, signup } = require("../controllers/auth");
const {
  updateInfo,
  getInfo,
} = require("../controllers/employeeContollers");

const {
  getAllEmployeeSummaries,
  generateRegistrationToken,
  getRegistrationTokenHistory,
  processOnboardingApplication,
  getAllOnboardingApplications,
  getOnboardingApplicationsByStatus,
} = require("../controllers/hrControllers");
const { checkExistence } = require("../utils/query");
// 请根据前端的实际需要修改此处的router

// Query
router.get("/query", checkExistence);

// Auth Flow
router.post("/sign-up", verifyToken, signup);
router.post("/sign-in", signin);
// router.post('/logout', logout)
// router.post("/update-pwd", updatePassword);

// Employee Flow
router.put("/update-info", updateInfo);
router.get("/personal-information/:username", getInfo);



// HR Flow
router.get("/hr/all-employees", getAllEmployeeSummaries);
router.post("/hr/registration/send", generateRegistrationToken);
router.get("/hr/registration/history", getRegistrationTokenHistory);
router.get("/hr/onboardapplication", getAllOnboardingApplications);
router.put("/hr/onboardapplication/process/:employeeId", processOnboardingApplication);

module.exports = router;
