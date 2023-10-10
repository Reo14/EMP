const Reference = require('../models/reference');

// 创建新的reference
async function createReference(req, res) {
  try {
    const newReference = new Reference(req.body);
    const savedReference = await newReference.save();
    res.json(savedReference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 获取所有references
async function getAllReferences(req, res) {
  try {
    const references = await Reference.find();
    res.json(references);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 其他操作...

module.exports = { createReference, getAllReferences };
