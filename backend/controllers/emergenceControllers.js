const EmergencyContact = require('../models/emergenceContact');

// 创建新的紧急联系人
async function createEmergencyContact(req, res) {
  try {
    const newEmergencyContact = new EmergencyContact(req.body);
    const savedEmergencyContact = await newEmergencyContact.save();
    res.json(savedEmergencyContact);
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
