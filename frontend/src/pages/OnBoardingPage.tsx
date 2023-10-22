import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { FormikProps, useFormik } from "formik";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../store/configureStore";
import { submitOnboarding } from "../store/reducers/onboarding";
import { EmployeeInfo } from "../types/employee";

const OnBoardingPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onboardingStatus = useSelector<RootState, string>(
    (state) => state.onboarding.onboardingStatus
  );
  const email = useSelector<RootState, string>((state) => state.auth.email);
  const username = useSelector<RootState, string>(
    (state) => state.auth.username
  );
  const userId = useSelector<RootState, string>((state) => state.auth.userId);

  // form validation
  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: false,
    initialValues: {
      // properties from registeration
      username,
      email,
      userId,
      // properties are to be filled in
      firstName: "",
      lastName: "",
      middleName: "",
      preferredName: "",
      profilePicture: "",
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
        employeeId: "000000", // Hardcode to the default HR
      },
      emergencyContact: {
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        phone: "",
        relationship: "",
        employeeId: "000000", // Hardcode to the default HR
      },
    },
    validationSchema: Yup.object({
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
        buildingAptNumber: Yup.string().required(
          "Builidng Address is required"
        ),
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
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(submitOnboarding(values));
    },
  });

  // useEffect(() => {
  //   console.log("isPermanentResident:", formik.values.isPermanentResident);
  //   console.log("employment.visaTitle:", formik.values.employment.visaTitle);
  // }, [formik.values.isPermanentResident, formik.values.employment.visaTitle]);

  // useEffect(() => {
  //   console.log("Errors:", formik.errors);
  // }, [formik.errors]);

  const inputStyles = {
    mt: "2",
    variant: "outline",
    border: "1px solid",
    borderColor: "gray.300",
    textColor: "black",
    _hover: {
      borderColor: "blue.500",
      boxShadow: "0 0 0 1px #3182ce",
    },
  };

  return (
    <Box p={{ base: 2, md: 4 }} maxW="800px" mx="auto" textColor="black">
      {/* ----- reject alert -----  */}
      {onboardingStatus === "Rejected" && (
        <Alert
          status="error"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          padding="0.75rem 1.5rem"
        >
          <Box display="flex" flexDirection="row">
            <AlertIcon />
            Sorry, your application was rejected.
          </Box>

          <Box>
            <Button
              colorScheme="red"
              size="sm"
              // TODO: show feedback
            >
              See Feedback
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              marginLeft="3"
              // TODO: onClick={handleReSubmission}
            >
              Re-Submit Application
            </Button>
          </Box>
        </Alert>
      )}

      {onboardingStatus === "Pending" && (
        <Alert
          status="warning"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          padding="0.75rem 1.5rem"
        >
          <Box display="flex" flexDirection="row">
            <AlertIcon />
            Please wait for HR to review your application.
          </Box>

          <Button
            colorScheme="teal"
            size="sm"
            // TODO: onClick
          >
            Review Infos
          </Button>
        </Alert>
      )}

      {/* {resubmit && ( */}
      {onboardingStatus === "Never submitted" && (
        <Box>
          <Heading as="h1" mb="4">
            Collect Infos
          </Heading>
          <Box boxShadow="dark-lg" p="6" rounded="md" bg="white">
            <VStack spacing="6">
              {/* ----- basic info part -----  */}
              <Heading as="h3" fontSize="xl">
                Basic Infos
              </Heading>
              <HStack width="100%">
                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.firstName && !!formik.errors.firstName
                  }
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="firstName"
                    {...inputStyles}
                    placeholder="firstname"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <FormErrorMessage>
                      {formik.errors.firstName}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.lastName && !!formik.errors.lastName
                  }
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="lastName"
                    {...inputStyles}
                    placeholder="lastname"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <FormErrorMessage>
                      {formik.errors.lastName}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              <HStack width="100%">
                <FormControl
                  isInvalid={
                    formik.touched.middleName && !!formik.errors.middleName
                  }
                >
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="middleName"
                    {...inputStyles}
                  />
                  {formik.touched.middleName && formik.errors.middleName ? (
                    <FormErrorMessage>
                      {formik.errors.middleName}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.preferredName &&
                    !!formik.errors.preferredName
                  }
                >
                  <FormLabel>Preferred Name</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.preferredName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="preferredName"
                    {...inputStyles}
                  />
                  {formik.touched.preferredName &&
                  formik.errors.preferredName ? (
                    <FormErrorMessage>
                      {formik.errors.preferredName}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Profile Image</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar
                      size="lg"
                      // hardcode here
                      src={
                        formik.values.profilePicture ||
                        "https://bit.ly/dan-abramov"
                      }
                    />
                  </Center>
                  <Center>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => alert("Under development")}
                      // TODO:
                    >
                      Upload Avatar
                    </Button>
                  </Center>
                </Stack>
              </FormControl>

              <FormControl isRequired isDisabled={true}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  //   TODO: value这里是传进来的值，不能修改的
                  // Done.
                  value={email || "placeholder"}
                  {...inputStyles}
                />
              </FormControl>

              <FormControl
                isRequired
                isInvalid={formik.touched.SSN && !!formik.errors.SSN}
              >
                <FormLabel>SSN</FormLabel>
                <Input
                  type="text"
                  value={formik.values.SSN}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="SSN"
                  {...inputStyles}
                />
                {formik.touched.SSN && formik.errors.SSN ? (
                  <FormErrorMessage>{formik.errors.SSN}</FormErrorMessage>
                ) : null}
              </FormControl>

              <HStack width="100%">
                <FormControl
                  isRequired
                  isInvalid={formik.touched.gender && !!formik.errors.gender}
                >
                  <FormLabel>Gender</FormLabel>
                  <Select
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="gender"
                    placeholder="Select option"
                    {...inputStyles}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="no-response">
                      I do not wish to answer.
                    </option>
                  </Select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={formik.touched.DOB && !!formik.errors.DOB}
                >
                  <FormLabel>Date of Birth</FormLabel>
                  <SingleDatepicker
                    name="DOB"
                    date={formik.values.DOB}
                    onDateChange={(selectedDate) => {
                      formik.setFieldValue("DOB", selectedDate);
                    }}
                  />
                  {formik.touched.DOB && formik.errors.DOB ? (
                    <FormErrorMessage>
                      {formik.errors.DOB as string}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              {/* ----- contact info part -----  */}
              <Divider />
              <Heading as="h3" fontSize="xl">
                Contact Infos
              </Heading>
              <HStack width="100%">
                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.Contact?.cellPhoneNumber &&
                    !!formik.errors.Contact?.cellPhoneNumber
                  }
                >
                  <FormLabel>Cell Phone Number</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.Contact?.cellPhoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Contact.cellPhoneNumber"
                    {...inputStyles}
                    placeholder="+1 (___) __-___-___"
                  />
                  {formik.touched.Contact?.cellPhoneNumber &&
                  formik.errors.Contact?.cellPhoneNumber ? (
                    <FormErrorMessage>
                      {formik.errors.Contact?.cellPhoneNumber}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl>
                  <FormLabel>Work Phone Number</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.Contact?.workPhoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Contact.workPhoneNumber"
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

              {/* ----- address part -----  */}
              <Divider />
              <Heading as="h3" fontSize="xl">
                Current Address
              </Heading>
              <FormControl
                isRequired
                isInvalid={
                  formik.touched.address?.buildingAptNumber &&
                  !!formik.errors.address?.buildingAptNumber
                }
              >
                <FormLabel>Building / Apt Number</FormLabel>
                <Input
                  type="text"
                  value={formik.values.address?.buildingAptNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="address.buildingAptNumber"
                  {...inputStyles}
                />
                {formik.touched.address?.buildingAptNumber &&
                formik.errors.address?.buildingAptNumber ? (
                  <FormErrorMessage>
                    {formik.errors.address?.buildingAptNumber}
                  </FormErrorMessage>
                ) : null}
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  formik.touched.address?.city && !!formik.errors.address?.city
                }
              >
                <FormLabel>Street Address</FormLabel>
                <Input
                  type="text"
                  value={formik.values.address?.streetName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="address.streetName"
                  {...inputStyles}
                />
                {formik.touched.address?.streetName &&
                formik.errors.address?.streetName ? (
                  <FormErrorMessage>
                    {formik.errors.address?.streetName}
                  </FormErrorMessage>
                ) : null}
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  formik.touched.address?.city && !!formik.errors.address?.city
                }
              >
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  value={formik.values.address?.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="address.city"
                  {...inputStyles}
                />
                {formik.touched.address?.city && formik.errors.address?.city ? (
                  <FormErrorMessage>
                    {formik.errors.address?.city}
                  </FormErrorMessage>
                ) : null}
              </FormControl>

              <HStack width="100%">
                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.address?.state &&
                    !!formik.errors.address?.state
                  }
                >
                  <FormLabel>State</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.address?.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="address.state"
                    {...inputStyles}
                  />
                  {formik.touched.address?.state &&
                  formik.errors.address?.state ? (
                    <FormErrorMessage>
                      {formik.errors.address?.state}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.address?.zip && !!formik.errors.address?.zip
                  }
                >
                  <FormLabel>Zip</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.address?.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="address.zip"
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

              {/* ----- work auth part -----  */}
              <Divider />
              <Heading as="h3" fontSize="xl">
                Work Authoriation
              </Heading>
              <FormControl
                isRequired
                isInvalid={
                  formik.touched.isPermanentResident &&
                  !!formik.errors.isPermanentResident
                }
              >
                <FormLabel>
                  Permanent resident or citizen of the U.S.?
                </FormLabel>
                <Select
                  name="isPermanentResident"
                  onChange={formik.handleChange}
                  placeholder="Select option"
                  {...inputStyles}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormControl>

              {formik.values.isPermanentResident === "Yes" ? (
                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.employment?.visaTitle &&
                    !!formik.errors.employment?.visaTitle
                  }
                >
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={formik.values.employment?.visaTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Select option"
                    name="employment.visaTitle"
                    {...inputStyles}
                  >
                    <option value="green-card">Green Card</option>
                    <option value="citizen">Citizen</option>
                  </Select>
                  {formik.touched.employment?.visaTitle &&
                  formik.errors.employment?.visaTitle ? (
                    <FormErrorMessage>
                      {formik.errors.employment?.visaTitle}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              ) : formik.values.isPermanentResident === "No" ? (
                <>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.touched.employment?.visaTitle &&
                      !!formik.errors.employment?.visaTitle
                    }
                  >
                    <FormLabel>What is your work authorization?</FormLabel>
                    <Select
                      value={formik.values.employment?.visaTitle}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="employment.visaTitle"
                      placeholder="Select option"
                      {...inputStyles}
                    >
                      <option value="h1b">H1-B</option>
                      <option value="l2">L2</option>
                      <option value="f1">F1 (CPT/OPT)</option>
                      <option value="h4">H4</option>
                      <option value="other">Other</option>
                    </Select>
                    {formik.touched.employment?.visaTitle &&
                    formik.errors.employment?.visaTitle ? (
                      <FormErrorMessage>
                        {formik.errors.employment?.visaTitle}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>

                  {formik.values.employment?.visaTitle === "f1" ? (
                    <HStack>
                      <FormControl>
                        <Input type="file" />
                        <Button size="sm" colorScheme="red">
                          Upload OPT Receipt
                        </Button>
                      </FormControl>
                    </HStack>
                  ) : formik.values.employment?.visaTitle === "other" ? (
                    <FormControl>
                      <Input
                        type="text"
                        value={formik.values.employment?.visaTitle}
                        isDisabled
                        {...inputStyles}
                      />
                    </FormControl>
                  ) : null}

                  <HStack width="100%">
                    <FormControl
                      isRequired
                      isInvalid={
                        formik.touched.employment?.startDate &&
                        !!formik.errors.employment?.startDate
                      }
                    >
                      <FormLabel>Start Date</FormLabel>
                      <SingleDatepicker
                        name="employment.startDate"
                        date={formik.values.employment?.startDate}
                        onDateChange={(selectedDate) => {
                          formik.setFieldValue(
                            "employment.startDate",
                            selectedDate
                          );
                        }}
                      />
                      {formik.touched.employment?.startDate &&
                      formik.errors.employment?.startDate ? (
                        <FormErrorMessage>
                          {formik.errors.employment?.startDate as string}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={
                        formik.touched.employment?.endDate &&
                        !!formik.errors.employment?.endDate
                      }
                    >
                      <FormLabel>End Date</FormLabel>
                      <SingleDatepicker
                        name="employment.endDate"
                        date={formik.values.employment?.endDate}
                        onDateChange={(selectedDate) => {
                          formik.setFieldValue(
                            "employment.endDate",
                            selectedDate
                          );
                        }}
                      />
                      {formik.touched.employment?.endDate &&
                      formik.errors.employment?.endDate ? (
                        <FormErrorMessage>
                          {formik.errors.employment?.endDate as string}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>
                  </HStack>
                </>
              ) : null}

              {/* ----- reference part -----  */}
              <Divider />
              <Heading as="h3" fontSize="xl">
                Reference Infos
              </Heading>
              <HStack width="100%">
                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.reference?.firstName &&
                    !!formik.errors.reference?.firstName
                  }
                >
                  <FormLabel>Referrer FirstName</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.reference?.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="reference.firstName"
                    {...inputStyles}
                    placeholder="referrer firstname"
                  />
                  {formik.touched.reference?.firstName &&
                  formik.errors.reference?.firstName ? (
                    <FormErrorMessage>
                      {formik.errors.reference?.firstName}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.reference?.lastName &&
                    !!formik.errors.reference?.lastName
                  }
                >
                  <FormLabel>Referrer LastName</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.reference?.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="reference.lastName"
                    {...inputStyles}
                    placeholder="referrer lastname"
                  />
                  {formik.touched.reference?.lastName &&
                  formik.errors.reference?.lastName ? (
                    <FormErrorMessage>
                      {formik.errors.reference?.lastName}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              <HStack width="100%">
                <FormControl>
                  <FormLabel>Referrer MiddleName</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.reference?.middleName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="reference.middleName"
                    {...inputStyles}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Referrer Phone</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.reference?.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="reference.phone"
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

              <HStack width="100%">
                <FormControl>
                  <FormLabel>Referrer Email</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.reference?.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="reference.phone"
                    {...inputStyles}
                  />
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.reference?.relationship &&
                    !!formik.errors.reference?.relationship
                  }
                >
                  <FormLabel>Referrer Relationship</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.reference?.relationship}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="reference.relationship"
                    {...inputStyles}
                  />
                  {formik.touched.reference?.relationship &&
                  formik.errors.reference?.relationship ? (
                    <FormErrorMessage>
                      {formik.errors.reference?.relationship}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              {/* ----- emergency part -----  */}
              <Divider />
              <Heading as="h3" fontSize="xl">
                Emergency Contact / ICE
              </Heading>
              <HStack width="100%">
                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.emergencyContact?.firstName &&
                    !!formik.errors.emergencyContact?.firstName
                  }
                >
                  <FormLabel>ICE FirstName</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.emergencyContact?.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="emergencyContact.firstName"
                    {...inputStyles}
                    placeholder="emergency contact firstname"
                  />
                  {formik.touched.emergencyContact?.firstName &&
                  formik.errors.emergencyContact?.firstName ? (
                    <FormErrorMessage>
                      {formik.errors.emergencyContact?.firstName}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.emergencyContact?.lastName &&
                    !!formik.errors.emergencyContact?.lastName
                  }
                >
                  <FormLabel>ICE LastName</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.emergencyContact?.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="emergencyContact.lastName"
                    {...inputStyles}
                    placeholder="emergency contact lastname"
                  />
                  {formik.touched.emergencyContact?.lastName &&
                  formik.errors.emergencyContact?.lastName ? (
                    <FormErrorMessage>
                      {formik.errors.emergencyContact?.lastName}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              <HStack width="100%">
                <FormControl>
                  <FormLabel>ICE MiddleName</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.emergencyContact?.middleName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="emergencyContact.middleName"
                    {...inputStyles}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>ICE Phone</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.emergencyContact?.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="emergencyContact.phone"
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

              <HStack width="100%">
                <FormControl>
                  <FormLabel>ICE Email</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.emergencyContact?.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="emergencyContact.email"
                    {...inputStyles}
                  />
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.emergencyContact?.relationship &&
                    !!formik.errors.emergencyContact?.relationship
                  }
                >
                  <FormLabel>ICE Relationship</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.emergencyContact?.relationship}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="emergencyContact.relationship"
                    {...inputStyles}
                  />
                  {formik.touched.emergencyContact?.relationship &&
                  formik.errors.emergencyContact?.relationship ? (
                    <FormErrorMessage>
                      {formik.errors.emergencyContact?.relationship}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              {/* TODO: Summary */}

              <Button
                colorScheme="blue"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                Submit
              </Button>
            </VStack>
          </Box>
        </Box>
      )}
      {/* )} */}
    </Box>
  );
};

export default OnBoardingPage;
