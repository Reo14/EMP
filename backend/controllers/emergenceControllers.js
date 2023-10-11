const EmergencyContact = require('../models/emergenceContact');

// 创建新的紧急联系人
async function createEmergencyContact(req, res) {
  try {
    const {
      firstName,
      lastName ,
      middleName ,
      phone,
      email,
      relationship,
      // Other details
    } = req.body;
   
    const emergenceContact = await User.findOne({ userID: employeeId });

    if (!employee) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 获取所有紧急联系人
async function getAllEmergencyContacts(req, res) {
  try {
    const emergencyContacts = await EmergencyContact.find();
    res.json(emergencyContacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 其他紧急联系人操作...

module.exports = { createEmergencyContact, getAllEmergencyContacts };
