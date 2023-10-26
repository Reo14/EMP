export type Reference = {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  email?: string;
  relationship: string;
};

export type EmergencyContact = {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  email?: string;
  relationship: string;
};

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
  startDate: Date | string;
  endDate: Date | string;
};

export type Document = {
  name: string;
  type: string;
  file: string;
};

export type EmployeeInfo = {
  username: string;
  password?: string; // delete after debugging
  email: string;
  role?: string;
  onboardStatus: string;
  nextStep: string,
  emergencyContact: EmergencyContact;
  reference: Reference;
  userId?: string;
  hrId?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  profilePicture: string;
  Contact: Contact;
  address: Address;
  SSN: string;
  DOB: Date | string;
  gender: string;
  isPermanentResident: string;
  employment: Employment;
  documents?: Document[];
};
