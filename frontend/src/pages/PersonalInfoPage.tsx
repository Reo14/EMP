import { FC, useEffect, useState } from "react";
import {
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Avatar,
  Select,
  Stack,
  Center,
  Progress,
  ButtonGroup,
  Flex,
  FormErrorMessage,
  Text,
  VStack,
} from "@chakra-ui/react";
import { parseISO } from "date-fns";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Form, Formik, FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import { EmployeeInfo } from "../types/employee";
import { validationSchema } from "../utils/formikConfig";
import {
  editEmployeeInfo,
  fetchEmployeeInfo,
} from "../store/reducers/employee";
import { useLocation, useNavigate } from "react-router-dom";

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
  autoFocus: true,
};

interface Props {
  formik: FormikProps<EmployeeInfo>;
}

const NameForm: FC<Props> = ({ formik }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  };

  return (
    <>
      <HStack mb="1rem">
        <Heading as="h3" size="lg">
          Name Infos
        </Heading>
        {isEditing ? (
          <>
            <Button size="sm" colorScheme="blue" onClick={handleCancelOnClick}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="red" onClick={handleSaveOnClick}>
              Save
            </Button>
          </>
        ) : (
          <Button size="sm" colorScheme="teal" onClick={handleEditOnClick}>
            Edit
          </Button>
        )}
      </HStack>

      <VStack spacing={4}>
        <HStack width="100%">
          <FormControl
            isRequired
            isInvalid={formik.touched.firstName && !!formik.errors.firstName}
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
              isDisabled={!isEditing}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl
            isRequired
            isInvalid={formik.touched.lastName && !!formik.errors.lastName}
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
              isDisabled={!isEditing}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
            ) : null}
          </FormControl>
        </HStack>

        <HStack width="100%">
          <FormControl
            isInvalid={formik.touched.middleName && !!formik.errors.middleName}
          >
            <FormLabel>Middle Name</FormLabel>
            <Input
              type="text"
              value={formik.values.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="middleName"
              {...inputStyles}
              isDisabled={!isEditing}
            />
            {formik.touched.middleName && formik.errors.middleName ? (
              <FormErrorMessage>{formik.errors.middleName}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl
            isInvalid={
              formik.touched.preferredName && !!formik.errors.preferredName
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
              isDisabled={!isEditing}
            />
            {formik.touched.preferredName && formik.errors.preferredName ? (
              <FormErrorMessage>{formik.errors.preferredName}</FormErrorMessage>
            ) : null}
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Profile Image</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                size="lg"
                // TODO: name={employeeFirstName}
                src={formik.values.profilePicture || "https://bit.ly/dan-abramov"}
              />
            </Center>
            <Center>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                width="80%"
                height="50%"
                isDisabled={!isEditing}
              />
            </Center>
          </Stack>
        </FormControl>

        {/* <FormControl isRequired isDisabled={true}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
            //   TODO: value这里是传进来的值，不能修改的
              {...inputStyles}
            />
          </FormControl> */}

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
            isDisabled={!isEditing}
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
              isDisabled={!isEditing}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="no-response">I do not wish to answer.</option>
            </Select>
            {formik.touched.gender && formik.errors.gender ? (
              <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl
            isRequired
            isInvalid={formik.touched.DOB && !!formik.errors.DOB}
          >
            <FormLabel>Data of Birth</FormLabel>
            <SingleDatepicker
              date={new Date(formik.values.DOB || "")}
              onDateChange={(date) => formik.setFieldValue("DOB", date)}
              name="DOB"
              disabled={!isEditing}
            />
            {formik.touched.DOB && formik.errors.DOB ? (
              <FormErrorMessage>{formik.errors.DOB as string}</FormErrorMessage>
            ) : null}
          </FormControl>
        </HStack>
      </VStack>
    </>
  );
};

const AddressForm: FC<Props> = ({ formik }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  };

  return (
    <>
      <HStack mb="1rem">
        <Heading as="h3" size="lg">
          Address Infos
        </Heading>
        {isEditing ? (
          <>
            <Button size="sm" colorScheme="blue" onClick={handleCancelOnClick}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="red" onClick={handleSaveOnClick}>
              Save
            </Button>
          </>
        ) : (
          <Button size="sm" colorScheme="teal" onClick={handleEditOnClick}>
            Edit
          </Button>
        )}
      </HStack>

      <VStack spacing={4}>
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
            name="address?.buildingAptNumber"
            {...inputStyles}
            isDisabled={!isEditing}
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
            name="address?.streetName"
            {...inputStyles}
            isDisabled={!isEditing}
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
            name="address?.city"
            {...inputStyles}
            isDisabled={!isEditing}
          />
          {formik.touched.address?.city && formik.errors.address?.city ? (
            <FormErrorMessage>{formik.errors.address?.city}</FormErrorMessage>
          ) : null}
        </FormControl>

        <HStack width="100%">
          <FormControl
            isRequired
            isInvalid={
              formik.touched.address?.state && !!formik.errors.address?.state
            }
          >
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              value={formik.values.address?.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="address?.state"
              {...inputStyles}
              isDisabled={!isEditing}
            />
            {formik.touched.address?.state && formik.errors.address?.state ? (
              <FormErrorMessage>{formik.errors.address?.state}</FormErrorMessage>
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
              name="address?.zip"
              {...inputStyles}
              isDisabled={!isEditing}
            />
            {formik.touched.address?.zip && formik.errors.address?.zip ? (
              <FormErrorMessage>{formik.errors.address?.zip}</FormErrorMessage>
            ) : null}
          </FormControl>
        </HStack>
      </VStack>
    </>
  );
};

const ContactInfoForm: FC<Props> = ({ formik }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  };

  return (
    <>
      <HStack mb="1rem">
        <Heading as="h3" size="lg">
          Contact Infos
        </Heading>
        {isEditing ? (
          <>
            <Button size="sm" colorScheme="blue" onClick={handleCancelOnClick}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="red" onClick={handleSaveOnClick}>
              Save
            </Button>
          </>
        ) : (
          <Button size="sm" colorScheme="teal" onClick={handleEditOnClick}>
            Edit
          </Button>
        )}
      </HStack>

      <VStack spacing={4}>
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
              name="Contact?.cellPhoneNumber"
              {...inputStyles}
              placeholder="+1 (___) __-___-___"
              isDisabled={!isEditing}
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
              name="Contact?.workPhoneNumber"
              {...inputStyles}
              isDisabled={!isEditing}
            />
          </FormControl>
        </HStack>
      </VStack>
    </>
  );
};

const EmploymentForm: FC<Props> = ({ formik }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  };

  return (
    <>
      <HStack mb="1rem">
        <Heading as="h3" size="lg">
          Employment Infos
        </Heading>
        {isEditing ? (
          <>
            <Button size="sm" colorScheme="blue" onClick={handleCancelOnClick}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="red" onClick={handleSaveOnClick}>
              Save
            </Button>
          </>
        ) : (
          <Button size="sm" colorScheme="teal" onClick={handleEditOnClick}>
            Edit
          </Button>
        )}
      </HStack>

      <VStack spacing={4}>
        <FormControl
          isRequired
          isInvalid={
            formik.touched.isPermanentResident &&
            !!formik.errors.isPermanentResident
          }
        >
          <FormLabel>Permanent resident or citizen of the U.S.?</FormLabel>
          <Select
            name="isPermanentResident"
            onChange={formik.handleChange}
            placeholder="Select option"
            {...inputStyles}
            isDisabled={!isEditing}
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
              name="employment?.visaTitle"
              placeholder="Select option"
              {...inputStyles}
              isDisabled={!isEditing}
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
                name="employment?.visaTitle"
                placeholder="Select option"
                {...inputStyles}
                isDisabled={!isEditing}
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
              <FormControl isRequired margin="0.5rem 0">
                <FormLabel>Please upload your OPT receipt.</FormLabel>
                <Input
                  type="file"
                  accept=".pdf"
                  width="40%"
                  height="100%"
                  isDisabled={!isEditing}
                />
              </FormControl>
            ) : formik.values.employment?.visaTitle === "other" ? (
              <FormControl isRequired>
                <FormLabel>Please specify your working authoriation.</FormLabel>
                <Input
                  type="text"
                  value={formik.values.employment?.visaTitle}
                  readOnly
                  {...inputStyles}
                  isDisabled={!isEditing}
                />
              </FormControl>
            ) : (
              <></>
            )}

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
                  name="employment?.startDate"
                  date={
                    new Date(formik.values.employment?.startDate || Date.now())
                  }
                  onDateChange={(selectedDate) => {
                    formik.setFieldValue("employment?.startDate", selectedDate);
                  }}
                  disabled={!isEditing}
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
                  name="employment?.endDate"
                  date={new Date(formik.values.employment?.endDate || Date.now())}
                  onDateChange={(selectedDate) => {
                    formik.setFieldValue("employment?.endDate", selectedDate);
                  }}
                  disabled={!isEditing}
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
        ) : (
          <></>
        )}
      </VStack>
    </>
  );
};

const EmergencyContactForm: FC<Props> = ({ formik }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  };

  return (
    <>
      <HStack mb="1rem">
        <Heading as="h3" size="lg">
          Contact Infos
        </Heading>
        {isEditing ? (
          <>
            <Button size="sm" colorScheme="blue" onClick={handleCancelOnClick}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="red" onClick={handleSaveOnClick}>
              Save
            </Button>
          </>
        ) : (
          <Button size="sm" colorScheme="teal" onClick={handleEditOnClick}>
            Edit
          </Button>
        )}
      </HStack>

      <VStack spacing={4}>
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
              name="emergencyContact?.firstName"
              {...inputStyles}
              placeholder="emergency contact firstname"
              isDisabled={!isEditing}
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
              name="emergencyContact?.lastName"
              {...inputStyles}
              placeholder="emergency contact lastname"
              isDisabled={!isEditing}
            />
          </FormControl>
          {formik.touched.emergencyContact?.lastName &&
          formik.errors.emergencyContact?.lastName ? (
            <FormErrorMessage>
              {formik.errors.emergencyContact?.lastName}
            </FormErrorMessage>
          ) : null}
        </HStack>

        <HStack width="100%">
          <FormControl>
            <FormLabel>ICE MiddleName</FormLabel>
            <Input
              type="text"
              value={formik.values.emergencyContact?.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="emergencyContact?.middleName"
              {...inputStyles}
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>ICE Phone</FormLabel>
            <Input
              type="text"
              value={formik.values.emergencyContact?.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="emergencyContact?.phone"
              {...inputStyles}
              isDisabled={!isEditing}
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
              name="emergencyContact?.email"
              {...inputStyles}
              isDisabled={!isEditing}
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
              name="emergencyContact?.relationship"
              {...inputStyles}
              isDisabled={!isEditing}
            />
            {formik.touched.emergencyContact?.relationship &&
            formik.errors.emergencyContact?.relationship ? (
              <FormErrorMessage>
                {formik.errors.emergencyContact?.relationship}
              </FormErrorMessage>
            ) : null}
          </FormControl>
        </HStack>
      </VStack>
    </>
  );
};

// TODO:
const DocumentForm: FC<Props> = ({ formik }) => {
  const { documents } = formik.values;
  return (
    <>
      <Heading as="h3" size="lg" mb="1rem">
        Documents
      </Heading>
      {documents && documents.length > 0 ? (
        documents.map((doc, index) => {
          return (
            <Box
              key={index}
              marginTop="1rem"
              display="flex"
              flexDir="row"
              marginBottom="1rem"
            >
              <Text size="lg">
                File Type: {doc.type}
              </Text>
              <Button
                size="sm"
                colorScheme="blue"
                // onClick={() => {
                //   // 实现下载逻辑，可以使用浏览器的下载功能
                //   window.open(`data:${doc.type};base64,${doc.file}`, '_blank');
                // }}
              >
                Preview
              </Button>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => {
                  // 实现下载逻辑，可以使用浏览器的下载功能
                  const link = document.createElement('a');
                  link.href = `data:${doc.type};base64,${doc.file}`;
                  link.download = doc.type;
                  link.click();
                }}
              >
                Download
              </Button>
            </Box>
          );
        })
      ) : (
        <Text size="xl" marginTop="1rem">No documents to display</Text>
      )}
    </>
  );
};

const PersonalInfoPage: FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(16.67);
  const [isLoading, setIsLoading] = useState(true);

  // redux
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userId = useSelector<RootState, string>((state) => state.auth.userId);
  const employeeInfo = useSelector<RootState, EmployeeInfo>(
    (state) => state.employee.info
  );

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchEmployeeInfo(userId)).unwrap();
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch employee info: ", error);
        setIsLoading(true);
        alert(error);
        navigate("/error");
      }
    })();
  }, []);

  if (isLoading) {
    return <Heading>Loading Info...</Heading>;
  }

  return (
    <Formik
      initialValues={employeeInfo}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(editEmployeeInfo(values));
      }}
    >
      {(formikProps) => (
        <Box
          borderWidth="1px"
          rounded="md"
          boxShadow="dark-lg"
          bg="white"
          maxWidth={800}
          p={6}
          m="1rem auto"
          as={Form}
        >
          <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated />
          {step === 1 ? (
            <NameForm formik={formikProps} />
          ) : step === 2 ? (
            <AddressForm formik={formikProps} />
          ) : step === 3 ? (
            <ContactInfoForm formik={formikProps} />
          ) : step === 4 ? (
            <EmploymentForm formik={formikProps} />
          ) : step === 5 ? (
            <EmergencyContactForm formik={formikProps} />
          ) : (
        <DocumentForm formik={formikProps} />
          )}

          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 16.67);
                  }}
                  isDisabled={step === 1}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
                <Button
                  w="7rem"
                  isDisabled={step === 6}
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 6) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 16.67);
                    }
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              {step === 6 ? (
                <Button
                  w="7rem"
                  colorScheme="red"
                  variant="solid"
                  type="submit"
                >
                  Submit
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
)}
    </Formik>
  );
};

export default PersonalInfoPage;
