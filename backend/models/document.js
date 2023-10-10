const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    onboardingApplicationID: { type: mongoose.Schema.Types.ObjectId, ref: 'OnboardingApplication' },
    documentType: String,
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    filePath: String,
    feedback: String,
  });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
