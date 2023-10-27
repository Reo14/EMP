// 引入模型
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// 提交入职申请
async function updateInfo(req, res) {
  try {
    // 获取员工信息
    let employeeInfo = req.body;
    console.log("userId", employeeInfo.userId);

    const employee = await User.findOneAndUpdate(
      { userId: employeeInfo.userId },
      { employeeInfo }
    );
    console.log("employee", employee);
    if (!employee) {
      console.log("No User found");
      return res.status(400).json({ error: "Invalid employee ID" });
    }
    res
      .status(200)
      .json({ message: "Onboarding application submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unkown Error" });
  }
}

// 获取个人信息
async function getInfo(req, res) {
  try {
    const { userId } = req.params;
    console.log("Getting Information of Employee", userId);

    const employee = await User.findOne({ userId });

    if (!employee) {
      return res.status(404).json({ error: "No user found" });
    }
    // console.log("Getting Information of Employee", employee);

    res.status(200).json({ employee });
  } catch (error) {
    console.log("Internal Error: ", error);
    res.status(500).json({ error });
  }
}

async function getOnboardStatus(req, res) {
  try {
    const { id } = req.params;
    const employee = await User.findOne({ userId: id });
    if (!employee) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json({ onboardStatus: employee.onboardStatus });
  } catch (error) {
    res.status(500).json({ error: "Internal Error" });
  }
}

// 提交签证文档
async function submitVisaDocument(req, res) {
  try {
    const { id } = req.params;
    const { type } = req.body;

    // Check if the user exists
    const employee = await User.findOne({ userId: id });

    if (!employee) {
      return res.status(404).json({ error: "User not found" });
    }

    if (type === "OPT Receipt") {
      employee.currentStep = "pending OPT Receipt";
    } else if (type === "OPT EAD") {
      employee.currentStep = "pending OPT EAD";
    } else if (type === "I-983") {
      employee.currentStep = "pending I-983";
    } else if (type === "I-20") {
      employee.currentStep = "pending I-20";
    } else {
      employee.currentStep = "pre-completed";
    }

    // Use req.file.path if the file is uploaded via multer
    const filePath = req.file ? req.file.path : null;

    // Add the document to the user's documents array
    employee.documents.push({
      type,
      file: filePath,
      status: "Pending",
    });

    // Save the updated user document
    await employee.save();

    res.status(200).json({ message: "Visa document submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function triggerNextStep(req, res) {
  try {
    const { id } = req.params;
    const { opinion, reason } = req.body;
    const user = await User.findOne({ userId: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (opinion === "Approved") {
      const curStep = user.currentStep;
      user.nextStep =
        curStep === "not started"
          ? "pending OPT Receipt"
          : curStep === "pending OPT Receipt"
          ? "pending OPT-EAD"
          : curStep === "pending OPT-EAD"
          ? "pending I-983"
          : curStep === "pending I-983"
          ? "pending I-20"
          : curStep === "pending I-20"
          ? "pre-completed"
          : "completed";
      return res.status(200).json({ message: "Visa approved successfully" });
    } else {
      user.nextStep = "rejected";
      user.visaFeedback = reason;
      return res.status(200).json({
        message: "Visa rejected successfully",
        reason: user.visaFeedback,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCurAndNextStep(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const docs = user.documents;
    const len = docs.length;
    const { type, status, Feedback } = docs[len - 1];
    if (status === "Pending") {
      const curStep = "pending " + type;
      return res.json({ curStep, feedback: "pending" });
    } else if (status === "Approved") {
      const curStep = "completed " + type;
      const enumValues = User.schema.path("documents.type").enumValues;
      const index = enumValues.indexOf(type);
      const nextStep =
        index === 3 ? "completed" : "pending " + enumValues[index + 1];
      return res.json({ curStep, nextStep, feedback: "approved" });
    } else {
      return res.json({ curStep: "rejected", feedback: Feedback });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  updateInfo,
  getInfo,
  getOnboardStatus,
  submitVisaDocument,
  triggerNextStep,
  getCurAndNextStep,
};
