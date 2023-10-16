const EmergencyContact = require('../models/emergenceContact');

// 创建新的紧急联系人
async function createEmergencyContact(req, res) {
  try {
    const {id} = req.params;

    const {
      firstName,
      lastName ,
      middleName ,
      phone,
      email,
      relationship,
      // Other details
    } = req.body;
   
    const employee = await User.findOne({ userID: id });

    if (!employee) {
      return res.status(400).json({ error: error.message });
    }

    const emergenceContact = new EmergencyContact({
      employeeId: id,
      firstName: firstName,
      lastName: lastName ,
      middleName: middleName ,
      phone: phone,
      email: email,
      relationship: relationship,
    }
    );

    await emergenceContact.save();

    res.status(200).json({ message: 'New Emergence Contact Created Successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 获取特定员工的所有紧急联系人
async function getAllEmergencyContacts(req, res) {
  try {
    const { id } = req.params;
    const employee = await User.findOne({ userId: id });

    if (!employee) {
      return res.status(400).json({ error: error.message });
    }

    const emergencyContacts = await EmergencyContact.find({ employeeId: id });
    res.json(emergencyContacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 更新特定紧急联系人信息
async function updateEmergencyContact(req, res) {
  try {
    const { emergenceContactid } = req.params;
    const {
      firstName,
      lastName,
      middleName,
      phone,
      email,
      relationship,
      // Other details
    } = req.body;

    const updatedContact = await EmergencyContact.findOneAndUpdate(
      { _id: emergenceContactid }, // Filter by contact ID
      {
        firstName,
        lastName,
        middleName,
        phone,
        email,
        relationship,
        // Update other details as needed
      },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ error: error.message });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 删除特定紧急联系人
async function deleteEmergencyContact(req, res) {
  try {
    const { emergenceContactid } = req.params;

    const deletedContact = await EmergencyContact.findOneAndDelete({ _id: emergenceContactid });

    if (!deletedContact) {
      return res.status(404).json({ error: error.message });
    }

    res.json({ message: 'Emergency contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = { createEmergencyContact, getAllEmergencyContacts, updateEmergencyContact, deleteEmergencyContact };
