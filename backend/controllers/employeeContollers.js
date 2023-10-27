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

// async function triggerNextStep(req, res) {
//   try {
//     const { id } = req.params;
//     const { opinion, reason } = req.body;
//     const user = await User.findOne({ userId: id });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     if (opinion === "Approved") {
//       const curStep = user.currentStep;
//       user.nextStep =
//         curStep === "not started"
//           ? "pending OPT Receipt"
//           : curStep === "pending OPT Receipt"
//           ? "pending OPT-EAD"
//           : curStep === "pending OPT-EAD"
//           ? "pending I-983"
//           : curStep === "pending I-983"
//           ? "pending I-20"
//           : curStep === "pending I-20"
//           ? "pre-completed"
//           : "completed";
//       return res.status(200).json({ message: "Visa approved successfully" });
//     } else {
//       user.nextStep = "rejected";
//       user.visaFeedback = reason;
//       return res.status(200).json({
//         message: "Visa rejected successfully",
//         reason: user.visaFeedback,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

async function checkAllFilesUploaded(req, res) {
  const requiredDocuments = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];

  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 获取用户已上传的所有文件类型
    const uploadedDocs = user.documents.map((doc) => doc.type);

    // 检查是否每一个必须的文件都在已上传的文件列表中
    const allUploaded = requiredDocuments.every((docType) =>
      uploadedDocs.includes(docType)
    );

    if (allUploaded) {
      res.json({ result: true });
    } else {
      res.json({
        result: false,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function checkFileUploaded(req, res) {
  const uploadSequence = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];
  try {
    const { type, userId } = req.params;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the document of the given type is uploaded
    const document = user.documents.find((doc) => doc.type === type);

    let isCurrent = false;

    for (let i = 0; i < uploadSequence.length; i++) {
      const currentType = uploadSequence[i];
      const currentDocument = user.documents.find(
        (doc) => doc.type === currentType
      );

      if (!currentDocument || currentDocument.status === "Rejected") {
        if (currentType === type) {
          isCurrent = true;
        }
        break;
      }

      if (currentDocument.status === "Pending") {
        if (currentType === type) {
          isCurrent = true;
        }
        break;
      }

      if (currentDocument.status === "Approved" && currentType === type) {
        isCurrent = true;
      }
    }

    if (document) {
      res.status(200).json({
        uploaded: true,
        status: document.status,
        feedback: document.Feedback,
        isCurrent: isCurrent,
        message: `${type} is already uploaded with status ${document.status}`,
      });
    } else {
      res.status(200).json({
        uploaded: false,
        isCurrent: isCurrent,
        message: `${type} has not been uploaded yet`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  updateInfo,
  getInfo,
  getOnboardStatus,
  submitVisaDocument,
  checkAllFilesUploaded,
  checkFileUploaded,
};
