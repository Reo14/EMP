const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["Employee", "HR"], default: "Employee" },

  registrationToken: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegistrationToken",
  },
  onboardingApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OnboardingApplication",
  },
  emergencyContact: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EmergencyContact" },
  ],

  reference: { type: mongoose.Schema.Types.ObjectId, ref: "Reference" },

  userId: { type: String, default: generateID, unique: true },
  hrId: { type: String, unique: true }, // Reference to his HR

  firstName: { type: String, required: true },
  lastName: { type: String, reuqire: true },
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
  DOB: { type: String },  // 生日不需要unique
  gender: {
    type: String,
    enum: ["Male", "Female", "I do not want to answer"],
    default: "I do not want to answer",
  },

  employment: {
    visaTitle: String,
    startDate: Date,
    endDate: Date,
  },

  documents: [
    {
      type: { type: String, required: true }, // Type of document (e.g., 'driverLicense', 'workAuthorization')
      file: { type: String }, // File path or URL
    },
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
