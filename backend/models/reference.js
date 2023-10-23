const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    employeeId: String,
    // referenceId: {type:String, required:true},
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    email: String,
    relationship: String,
  });

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;
