// 引入模型
const Employee = require('../models/Employee');
const RegistrationToken = require('../models/registrationToken');
const OnboardingApplication = require('../models/onboardingApplication');

// 生成注册令牌
async function generateRegistrationToken(req, res) {
  try {
    const { email } = req.body;

    // 输入验证
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // 检查邮箱是否已注册
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // 创建注册令牌
    const token = new RegistrationToken({ email });
    await token.save();

    // 实现邮件发送逻辑...
    // 假设这里调用发送邮件的函数 sendEmail(email, token)

    res.status(200).json({ message: 'Registration token sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 提交入职申请
async function submitOnboardingApplication(req, res) {
  try {
    // 获取员工信息，确保员工已注册
    const { employeeId, applicationData } = req.body;

    if (!employeeId || !applicationData) {
      return res.status(400).json({ error: 'Invalid data provided' });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    // 保存入职申请信息
    const application = new OnboardingApplication({
      employee: employeeId,
      data: applicationData,
    });

    await application.save();

    res.status(200).json({ message: 'Onboarding application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 获取个人信息
async function getPersonalInformation(req, res) {
  try {
    // 根据令牌或会话获取员工个人信息...
    // 这里需要添加身份验证逻辑，确保用户已登录或使用有效的令牌

    // 假设从请求中获取员工ID
    const employeeId = req.employeeId;

    // 查询员工信息
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ personalInformation: employee.personalInformation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 编辑个人信息
async function editPersonalInformation(req, res) {
  try {
    // 处理编辑个人信息逻辑，保存修改等...
    // 这里也需要添加身份验证逻辑，确保用户已登录或使用有效的令牌

    // 假设从请求中获取员工ID和要修改的信息
    const { employeeId, updatedInformation } = req.body;

    // 查询并更新员工信息
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { personalInformation: updatedInformation },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Personal information updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 管理签证状态
async function manageVisaStatus(req, res) {
  try {
    // 处理管理签证状态逻辑，上传文档、审批等...
    // 同样，需要添加身份验证逻辑，确保用户具有管理签证状态的权限

    // 假设从请求中获取员工ID和签证状态信息
    const { employeeId, visaStatus } = req.body;

    // 查询并更新员工签证状态
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { visaStatus },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Visa status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  generateRegistrationToken,
  submitOnboardingApplication,
  getPersonalInformation,
  editPersonalInformation,
  manageVisaStatus,
};
