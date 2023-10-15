const Reference = require('../models/reference');

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
   
    const employee = await User.findOne({ userID: id });

    if (!employee) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    // Check if a reference already exists for the employee
    const existingReference = await Reference.findOne({ employeeId:id });

    if (existingReference) {
      return res.status(400).json({ error: 'Reference already exists for this employee' });
    }

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
    res.status(500).json({ error: error.message });
  }
}

// 获取reference
async function getReference(req, res) {
  try {
    const { id } = req.params;
    const employee = await User.findOne({ userId: id });

    if (!employee) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    const reference = await Reference.find({ employeeId: id });
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
      { employeeIdid: id },
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
