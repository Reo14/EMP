const Employee = require('../models/employee');
const RegistrationToken = require('../models/registrationToken');
const OnboardingApplication = require('../models/onboardingApplication');

// 获取所有员工信息
async function getAllEmployeeSummaries(req, res) {
    try {
      const employees = await Employee.find().sort({ lastName: 1 }); // 按姓氏排序
      res.json(employees.map(employee => ({
        name: employee.fullName,
        ssn: employee.ssn,
        workAuthorizationTitle: employee.workAuthorization.title,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
      })));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
// 获取 Visa Status Management 中指定状态的员工
async function getVisaStatusEmployees(req, res) {
    try {
      const { status } = req.params; // 通过路由参数传递状态
  
      // 验证状态是否有效
      const validStatuses = ['InProgress', 'All'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
  
      // 根据状态查询员工
      let employees;
      if (status === 'InProgress') {
        employees = await Employee.find({ /* 查询条件，例如未完成的步骤 */ });
      } else {
        employees = await Employee.find({ /* 查询条件，例如所有持有签证的员工 */ });
      }
  
      // 构造响应
      const response = employees.map(employee => {
        const responseData = {
          name: employee.fullName,
          ...employee.toObject(), // 包含所有员工信息
        };
  
        if (status === 'InProgress') {
          // 添加工作授权信息
          responseData.workAuthorization = {
            title: employee.workAuthorization.title,
            startDate: employee.workAuthorization.startDate,
            endDate: employee.workAuthorization.endDate,
            daysRemaining: /* 计算剩余天数 */,
          };
        }
  
        return responseData;
      });
  
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
// 生成注册令牌并发送邮件
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

// 获取所有已发送过注册令牌的历史记录
async function getRegistrationTokenHistory(req, res) {
    try {
      const tokenHistory = await RegistrationToken.find();
      res.json(tokenHistory.map(token => ({
        email: token.email,
        personName: token.personName,
        registrationLink: token.registrationLink,
        status: token.status,
      })));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// 审批入职申请（批准或拒绝）
async function processOnboardingApplication(req, res) {
    try {
      const { applicationId } = req.params;
      const { feedback, action } = req.body;
  
      // 获取入职申请
      const application = await OnboardingApplication.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      // 执行相应的审批操作
      if (action === 'approve') {
        // 更新申请状态为已批准
        application.status = 'Approved';
      } else if (action === 'reject') {
        // 更新申请状态为已拒绝
        application.status = 'Rejected';
      } else {
        // 无效的操作
        return res.status(400).json({ message: 'Invalid action' });
      }
  
      // 添加审批意见
      application.feedback = feedback;
      await application.save();
  
      // 发送通知或其他操作...
  
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

// 获取所有入职申请
async function getAllOnboardingApplications(req, res) {
  try {
    const applications = await OnboardingApplication.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 获取某一状态的所有入职申请
async function getOnboardingApplicationsByStatus(req, res) {
    try {
      const { status } = req.params; // 通过路由参数传递状态
  
      // 验证状态是否有效，以防止恶意请求
      const validStatuses = ['Pending', 'Rejected', 'Approved'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
  
      const applications = await OnboardingApplication.find({ status });
  
      res.json(applications.map(application => ({
        fullName: application.fullName,
        email: application.email,
        status: application.status,
      })));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

// 其他 HR 操作...

module.exports = {
  getAllEmployeeSummaries,
  getVisaStatusEmployees,
  generateRegistrationToken,
  getRegistrationTokenHistory,
  processOnboardingApplication,
  getAllOnboardingApplications,
  getOnboardingApplicationsByStatus
  // 其他 HR 操作...
};

