const Reference = require('../models/reference');
const User = require("../models/user");

// 创建新的reference
async function createReference(req, res) {
  try {
    const {id} = req.params;

    const {
      // referenceId,
      firstName,
      lastName ,
      middleName ,
      phone,
      email,
      relationship,
      // Other details
    } = req.body;
   
    const employee = await User.findOne({ userId: id });

    if (!employee) {
      return res.status(400).json({ error: "Employee not found" });
    }
    console.log("Employee not found");
    
    // Check if a reference already exists for the employee
    const existingReference = await Reference.findOne({ employeeId: id });
    
    if (existingReference) {
      return res.status(400).json({ error: "Reference already exists" });
    }
    
    // Reference exists

    const reference = new Reference({
      // referenceId: referenceId,
      employeeId: id,
      firstName: firstName,
      lastName: lastName ,
      middleName: middleName ,
      phone: phone,
      email: email,
      relationship: relationship,
    }
    );

    await reference.save();

    res.status(200).json({ message: 'Reference created' });

  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
}

// 获取reference
async function getReference(req, res) {
  try {
    const { id } = req.params;
    // 此id为被推荐的员工的id 也即：此函数是获取某个员工的推荐人的信息
    const employee = await User.findOne({ userId: id });
    // 被推荐人必须已经注册
    if (!employee) {
      return res.status(400).json({ error: error.message });
    }

    const reference = await Reference.findOne({ employeeId: id });
    res.json(reference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 更新reference
async function updateReference(req, res) {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      middleName,
      phone,
      email,
      relationship,
      // Other details
    } = req.body;

    const updatedReference = await Reference.findOneAndUpdate(
      { employeeId: id },
      {
        firstName,
        lastName,
        middleName,
        phone,
        email,
        relationship,
      },
      { new: true }
    );

    if (!updatedReference) {
      return res.status(404).json({ error: 'Reference not found' });
    }

    res.json(updatedReference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 由于reference必须要有一个 我没有写delete函数

module.exports = { createReference, getReference, updateReference };
