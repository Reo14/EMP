// 引入模型
const User = require('../models/user');
const RegistrationToken = require('../models/registrationToken');
const OnboardingApplication = require('../models/onboardingApplication');


// 提交入职申请
async function submitOnboardingApplication(req, res) {
  try {
    // 获取员工信息
    const {
      registrationToken,
      employeeId,
      firstName,
      lastName,
      middleName,
      preferredName,
      profilePicture,
      phoneNumber,
      email,
      SSN,
      DOB,
      gender,
      visaTitle,
      // Other onboarding application details
    } = req.body;
   
    const employee = await User.findOne({ userID: employeeId });

    if (!employee) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    // 保存入职申请信息
    const application = new OnboardingApplication({
      registrationToken: registrationToken,
      employeeId: employeeId,
      firstName: firstName,
      lastName: lastName,
      middleName : middleName,
      preferredName: preferredName,
      profilePicture: profilePicture,
      phoneNumber : phoneNumber,
      email : email,
      SSN : SSN,
      DOB : DOB,
      gender : gender,
      visaTitle : visaTitle,
    });

    await application.save();

    res.status(200).json({ message: 'Onboarding application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 获取入职申请的状态
async function getOnboardingApplicationStatus(req, res) {
  try {
    const { id } = req.params;

    // Check if the employee exists
    const employee = await User.findOne({ userID: id });

    if (!employee) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    // Find the onboarding application for the employee
    const onboardingApplication = await OnboardingApplication.findOne({ employeeId });

    if (!onboardingApplication) {
      return res.status(404).json({ error: 'Onboarding application not found' });
    }

    // Return the status of the onboarding application
    res.json({ status: onboardingApplication.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// 获取个人信息
async function getPersonalInformation(req, res) {
  try {
    const {id} = req.params;

    const employee = User.findOne({userId: id})
    .populate('RegistrationToken')
    .populate('EmergencyContact')
    .populate('Reference')
    .populate('OnboardingApplication');

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const personalInformation = {
      username: employee.username,
      password: employee.password,
      email: employee.email,
      role: employee.role,
      registrationToken:  employee.registrationToken,
      onboardingApplication: employee.OnboardingApplication,
      emergencyContact: employee.emergencyContact,
      reference: employee.reference, 
      
      userId: employee.userId,
      hrId : employee.hrId, // Reference to his HR

      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName,
      preferredName: employee.preferredName,
      profilePicture : employee.profilePicture, // 请在Chakra UI库中给它设置一个icon作为默认头像

      Contact : employee.Contact,

      address: employee.address,

      SSN: employee.SSN,
      DOB: employee.DOB,
      gender: employee.gender,

      employment: employee.employment,

      documents: employee.document

      }

    res.status(200).json({ personalInformation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 编辑个人信息
async function editPersonalInformation(req, res) {
  try {
    const { id } = req.params;
    const updatedEmployee = req.body;

    // Find the employee by userId
    const employee = await User.findOne({ userId: id });

    // Check if the employee exists
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update employee fields with the data from the request body
    // 请将无法被更改的个人信息注释掉
    employee.username = updatedEmployee.username;
    employee.password = updatedEmployee.password;
    employee.email = updatedEmployee.email;
    // employee.role = updatedEmployee.role;
    // employee.registrationToken = updatedEmployee.registrationToken;
    // employee.onboardingApplication = updatedEmployee.onboardingApplication;
    // employee.emergencyContact = updatedEmployee.emergencyContact;
    // employee.reference = updatedEmployee.reference;
    // employee.userId = updatedEmployee.userId;
    // employee.hrId = updatedEmployee.hrId;
    employee.firstName = updatedEmployee.firstName;
    employee.lastName = updatedEmployee.lastName;
    employee.middleName = updatedEmployee.middleName;
    employee.preferredName = updatedEmployee.preferredName;
    employee.profilePicture = updatedEmployee.profilePicture;
    employee.Contact = updatedEmployee.Contact;
    employee.address = updatedEmployee.address;
    employee.SSN = updatedEmployee.SSN;
    employee.DOB = updatedEmployee.DOB;
    employee.gender = updatedEmployee.gender;
    employee.employment = updatedEmployee.employment;
    employee.documents = updatedEmployee.documents;

    // Save the updated employee document
    await employee.save();

    res.status(200).json({ message: 'Personal information updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// // 管理签证状态
// async function manageVisaStatus(req, res) {
//   try {
//     // 处理管理签证状态逻辑，上传文档、审批等...
//     // 同样，需要添加身份验证逻辑，确保用户具有管理签证状态的权限

//     // 假设从请求中获取员工ID和签证状态信息
//     const { employeeId, visaStatus } = req.body;

//     // 查询并更新员工签证状态
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       employeeId,
//       { visaStatus },
//       { new: true }
//     );

//     if (!updatedEmployee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     res.status(200).json({ message: 'Visa status updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

module.exports = {
  submitOnboardingApplication,
  getOnboardingApplicationStatus,
  getPersonalInformation,
  editPersonalInformation,
};
