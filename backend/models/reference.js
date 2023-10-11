const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: String,
    phone: String,
    email: String,
    relationship: String,
  });

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;
