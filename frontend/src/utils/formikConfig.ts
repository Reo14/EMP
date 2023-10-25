import * as Yup from "yup";
import { useFormik } from "formik";
import { EmployeeInfo } from "../types/employee";

export const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  SSN: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in the format xxx-yy-zzzz")
    .required("SSN is required"),
  DOB: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
  Contact: Yup.object().shape({
    cellPhoneNumber: Yup.string()
      .matches(
        /^\d{3}-\d{3}-\d{4}$/,
        "Phone number must be in the format xxx-xxx-xxxx"
      )
      .required("Phone number is required"),
  }),
  gender: Yup.string().required("Gender is required"),
  address: Yup.object().shape({
    buildingAptNumber: Yup.string().required("Builidng Address is required"),
    streetName: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City Address is required"),
    state: Yup.string().required("State Address is required"),
    zip: Yup.string().required("Zip Address is required"),
  }),
  isPermanentResident: Yup.string()
    .oneOf(["Yes", "No"], "Invalid selection")
    .required("This field is required"),
  employment: Yup.object().shape({
    visaTitle: Yup.string().when(
      "isPermanentResident",
      ([isPermanentResident], schema) => {
        if (isPermanentResident === "Yes") {
          return schema.required("Visa Title is required");
        } else {
          return schema.required("Visa Title is required");
        }
      }
    ),
    startDate: Yup.date().when(
      "isPermanentResident",
      ([isPermanentResident], schema) => {
        if (isPermanentResident === "No") {
          return schema
            .max(new Date(), "Start date cannot be in the future")
            .required("Start Date is required");
        }
        return schema.notRequired().nullable();
      }
    ),
    endDate: Yup.date().when(
      "isPermanentResident",
      ([isPermanentResident], schema) => {
        if (isPermanentResident === "No") {
          return schema
            .min(new Date(), "End date cannot be in the past")
            .required("End Date is required");
        }
        return schema.notRequired().nullable();
      }
    ),
  }),
  emergencyContact: Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    relationship: Yup.string().required("Relationship is required"),
  }),
  reference: Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    relationship: Yup.string().required("Relationship is required"),
  }),
});

export const initialValues = {
  username: "",
  email: "",
  userId: "",
  onboardStatus: "",
  firstName: "",
  lastName: "",
  middleName: "",
  preferredName: "",
  profilePicture: "https://bit.ly/dan-abramov",
  SSN: "",
  DOB: new Date(),
  gender: "",
  Contact: {
    cellPhoneNumber: "",
    workPhoneNumber: "",
  },
  address: {
    buildingAptNumber: "",
    streetName: "",
    city: "",
    state: "",
    zip: "",
  },
  isPermanentResident: "",
  employment: {
    visaTitle: "",
    startDate: new Date(),
    endDate: new Date(),
  },
  reference: {
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    relationship: "",
  },
  emergencyContact: {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    relationship: "",
  },
  documents: [],
};
