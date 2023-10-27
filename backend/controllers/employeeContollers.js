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
  updateInfo,
  getInfo,
  getOnboardStatus,
};