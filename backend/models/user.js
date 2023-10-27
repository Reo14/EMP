const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["Employee", "HR"], default: "Employee" },

  onboardStatus: {
    type: String,
    enum: ["Never submitted", "Rejected", "Pending", "Approved"],
    default: "Never submitted",
  },
  onboardFeedback: String,
  nextStep: {
    type: String,
    enum: [
      "rejected",
      "not started",
      "pending OPT Receipt",
      "pending OPT-EAD",
      "pending I-983",
      "pending I-20",
      "pre-completed",
      "completed",
    ],
    default: "not started",
  },
  currentStep: {
    type: String,
    enum: [
      "not started",
      "pending OPT Receipt",
      "pending OPT-EAD",
      "pending I-983",
      "pending I-20",
      "pre-completed",
      "completed",
    ],
    default: "not started",
  },
  visaFeedback: String,

  registrationToken: {
    type: String,
    unique: true,
    required: true,
  },
  
  registrationStatus: {
    type: String,
    enum: ["Submitted", "Not Submitted"],
    default: "Not Submitted",
  },

  emergencyContact: {
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    email: String,
    relationship: String,
  },

  reference: {
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    email: String,
    relationship: String,
  },

  userId: { type: String, default: generateID, unique: true },
  hrId: { type: String, unique: false }, // Reference to his HR

  firstName: { type: String },
  lastName: { type: String },
  middleName: String,
  preferredName: String,
  profilePicture: { type: String }, // 请在Chakra UI库中给它设置一个icon作为默认头像

  Contact: {
    cellPhoneNumber: String,
    workPhoneNumber: String,
  },

  address: {
    buildingAptNumber: String,
    streetName: String,
    city: String,
    state: String,
    zip: String,
  },

  SSN: { type: String, unqiue: true },
  DOB: String, // 生日不需要unique
  gender: {
    type: String,
    enum: ["male", "female", "I do not want to answer"],
    default: "I do not want to answer",
  },
  isPermanentResident: { type: String, enum: ["Yes", "No"], default: "No" },
  employment: {
    visaTitle: String,
    startDate: Date,
    endDate: Date,
  },

  documents: [
    {
      type: {
        type: String,
        enum: [
          "OPT Receipt",
          "OPT EAD",
          "I-983",
          "I-20",
          "Visa",
          "Passport",
          "ID",
          "Other"
        ],
        default: "Other"
      },
      file: {
        type: String // File path or URL
      },
      status: {
        type: String,
        enum: [
          "Pending",
          "Approved",
          "Rejected"
        ],
        default: "Pending"
      },
      Feedback: {
        type: String,
        default: "No comment"},
    }
  ],

});

function generateID() {
  //生成一个六位数字ID
  const length = 6;
  const chars = "0123456789";

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
