const User = require("../models/user");
const RegistrationToken = require("../models/registrationToken");
const OnboardingApplication = require("../models/onboardingApplication");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 获取所有员工信息
async function getAllEmployeeSummaries(req, res) {
  try {
    const employees = await User.find().sort({ lastName: 1 }); // 按姓氏排序
    res.json(
      employees.map((employee) => ({
        onboardStatus: employee.onboardStatus,
        registrationToken: employee.registrationToken,
        registrationStatus: employee.registrationStatus,
        firstName: employee.firstName,
        lastName: employee.lastName,
        middleName: employee.middleName,
        preferredName: employee.preferredName,
        profilePicture: employee.profilePicture,
        role: employee.role,
        reference: employee.reference,
        emergencyContact: employee.emergencyContact,
        SSN: employee.SSN,
        DOB: employee.DOB,
        employment: employee.employment,
        address: employee.address,
        Contact: employee.Contact,
        email: employee.email,
        userId: employee.userId,
        hrId: employee.hrId,
        gender: employee.gender,
        documents: employee.documents,
        onboardingApplication: employee.onboardingApplication,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// // 获取 Visa Status Management 中指定状态的员工
// async function getVisaStatusEmployees(req, res) {
//     try {
//       const { status } = req.params; // 通过路由参数传递状态

//       // 验证状态是否有效
//       const validStatuses = ['InProgress', 'All'];
//       if (!validStatuses.includes(status)) {
//         return res.status(400).json({ error: 'Invalid status' });
//       }

//       // 根据状态查询员工
//       let employees;
//       if (status === 'InProgress') {
//         employees = await Employee.find({ /* 查询条件，例如未完成的步骤 */ });
//       } else {
//         employees = await Employee.find({ /* 查询条件，例如所有持有签证的员工 */ });
//       }

//       // 构造响应
//       const response = employees.map(employee => {
//         const responseData = {
//           name: employee.fullName,
//           ...employee.toObject(), // 包含所有员工信息
//         };

//         if (status === 'InProgress') {
//           // 添加工作授权信息
//           responseData.workAuthorization = {
//             title: employee.workAuthorization.title,
//             startDate: employee.workAuthorization.startDate,
//             endDate: employee.workAuthorization.endDate,
//             daysRemaining: /* 计算剩余天数 */,
//           };
//         }

//         return responseData;
//       });

//       res.json(response);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

// 生成注册令牌并发送邮件
async function generateRegistrationToken(req, res) {
  try {
    const { email, employeeName, hrId } = req.body;
    console.log("Backend got info: ", email, employeeName, hrId);
    // Input validation
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email is existing
    const existingEmployee = await User.findOne({ email: email });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Generate JWT token with a 3-hour expiration
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    // Save the token in your RegistrationToken model
    const registrationToken = new RegistrationToken({
      email: email,
      employeeName: employeeName,
      registrationLink: token,
      status: "Not Submitted",
      hrID: hrId, // Reference to HR ID (Sender's ID)
    });
    await registrationToken.save();

    // Send email with registration link
    await sendRegistrationEmail(email, token);

    res.status(200).json({ message: "Registration token sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to send registration email
async function sendRegistrationEmail(email, token) {

  const msg = {
    to: email,
    from: "w2luo@ucsd.edu",
    subject: "Registration Token",
    text: `Click the following link to register: http://localhost:5173/sign-up?token=${token}`,
    html: `<p>Click the following <a href="http://localhost:5173/sign-up?token=${token}">link</a> to register.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.response.body.errors);
  }
}

// 获取所有已发送过注册令牌的历史记录
async function getRegistrationTokenHistory(req, res) {
  try {
    const users = await User.find();

    const tokenHistory = users.map((user) => ({
      email: user.email,
      firstName: user.firstName, 
      lastName: user.lastName,
      registrationLink: user.registrationToken,
      status: user.registrationStatus,
      onboardStatus: user.onboardStatus,
      userId: user.userId,
    }));

    res.json(tokenHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// 审批入职申请（批准或拒绝）
async function processEmployee(req, res) {
  try {
    const { userId } = req.params;
    const { status, reason } = req.body;
    console.log(
      `backend userId: ${userId} received status: ${status} and reason: ${
        reason || "none"
      }`
    );

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (status === "App Approved") {
      user.onboardStatus = "Approved";
    } else if (status === "App Rejected") {
      if (reason === "") throw new Error("Empty feedback");
      user.onboardStatus = "Rejected";
      user.onboardFeedback = reason;
    } else {
      return res.status(400).json({ error: "Invalid review" });
    }
    await user.save();
    res.status(200).json({
      message: "Onboarding status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// 获取所有入职申请
async function getAllOnboardingApplications(req, res) {
  try {
    const users = await User.find();

    const applications = users.map((user) => ({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      onboardStatus: user.onboardStatus,
    }));

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOnboardingApplicationsByStatus(req, res) {
  try {
    const { status } = req.params;

    // Validate the status to prevent malicious requests
    const validStatuses = ["Pending", "Rejected", "Approved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const users = await User.find({ onboardStatus: status });

    const formattedApplications = users.map((user) => ({
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      status: user.onboardStatus,
    }));

    res.json(formattedApplications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 审批OPT文件
async function updateDocumentStatus(req, res) {
  try {
    const { userId } = req.params;
    const { type, status, reason } = req.body;

    // Check if the user exists
    const user = await User.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the document in the user's documents array based on the type
    const documentToUpdate = user.documents.find(
      (document) => document.type === type
    );

    if (!documentToUpdate) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Update the document's status
    documentToUpdate.status = status;
    documentToUpdate.Feedback = reason;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Document status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function sendNotification(email) {
  const msg = {
    to: email,
    from: "w2luo@ucsd.edu",
    subject: "Reminder to submit your next document",
    text: "Don't forget to submit your next document on time!",
    html: "<p>Don't forget to submit your next document on time!</p>",
  };

  try {
    await sgMail.send(msg);
    console.log("Reminder email sent successfully!");
  } catch (error) {
    console.error("Error sending reminder email:", error.response.body.errors);
  }
}

// 其他 HR 操作...

module.exports = {
  getAllEmployeeSummaries,
  generateRegistrationToken,
  sendNotification,
  getRegistrationTokenHistory,
  processEmployee,
  getAllOnboardingApplications,
  getOnboardingApplicationsByStatus,
  updateDocumentStatus,
  // 其他 HR 操作...
};
