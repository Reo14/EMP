const mongoose = require('mongoose');

const onboardingApplicationSchema = new mongoose.Schema({
    registrationToken: { type: mongoose.Schema.Types.ObjectId, ref: 'RegistrationToken' },
    employeeId: {type: String, required: true},
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    firstName: {type: String, required: true },
    lastName: {type: String, reuqire: true},
    middleName: String,
    preferredName: String,
    profilePicture : {type: String}, // 请在Chakra UI库中给它设置一个icon作为默认头像
    phoneNumber: String,
    email: {type: String, unique: true},
    SSN: {type: String, unqiue: true},
    DOB: {type: String, unique: true},
    gender: {type: String, enum: ['Male', 'Female', 'I do not want to answer'], default: 'I do not want to answer'},
    visaTitle: {type: String, required: true},

    feedback: String,

    // Other onboarding application details
    
  });



onboardingApplicationSchema.pre('validate', async function (next) {
  // Check if email is not provided (null or undefined)
  if (!this.email && this.registrationToken) {
      try {
          // Populate the registrationToken field to get the registration document
          await this.populate('registrationToken').execPopulate();

          if (this.registrationToken && this.registrationToken.email) {
              // Access the email from the populated registrationToken field
              this.email = this.registrationToken.email;
          } else {
              // Handle the case where the registration document or email is not found
              console.error('Registration document or email not found');
          }
      } catch (error) {
          // Handle errors if any
          console.error('Error fetching registration document:', error);
      }
  }
  next();
});


const OnboardingApplication = mongoose.model('OnboardingApplication', onboardingApplicationSchema);

module.exports = OnboardingApplication;

