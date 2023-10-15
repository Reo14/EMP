const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    employeeId: {type:String, required:true},
    // referenceId: {type:String, required:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: String,
    phone: String,
    email: String,
    relationship: {type:String, required:true},
  });

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;
