export type Address = {
  buildingAptNumber: string;
  streetName: string;
  city: string;
  state: string;
  zip: string;
};

export type Contact = {
  cellPhoneNumber: string;
  workPhoneNumber: string;
};

export type Employment = {
  visaTitle: string;
  startDate: Date;
  endDate: Date;
};

export type Document = {
  type: string;
  file: string;
};

export type EmployeeInfo = {
  username: string;
  password: string; // delete after debugging
  email: string;
  role: string;
  registrationToken: string;
  onboardingApplication: string;
  emergencyContact: string[];
  reference: string;
  userId: string;
  hrId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  profilePicture: string;
  Contact: Contact;
  address: Address;
  SSN: string;
  DOB: string;
  gender: string;
  employment: Employment;
  documents: Document[];
};

