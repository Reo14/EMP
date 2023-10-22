export type Reference = {
  employeeId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  email?: string;
  relationship: string;
}

export type EmergencyContact = {
  employeeId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  email?: string;
  relationship: string;
}

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
  password?: string; // delete after debugging
  email: string;
  role?: string;
  onboardingApplication?: string;
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
  DOB: Date;
  gender: string;
  Employment: Employment;
  documents?: Document[];
};

