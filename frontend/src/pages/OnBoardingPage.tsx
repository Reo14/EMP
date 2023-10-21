import React, { FC, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Select,
  Avatar,
  Alert,
  AlertIcon,
  Divider,
  Stack,
  Center
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
// import { createProduct } from "../store/reducers/productSlice";

const OnBoardingPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ----- basic info -----
  const [employeeFirstName, setEmployeeFirstName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");
  const [employeeMiddleName, setEmployeeMiddleName] = useState("");
  const [employeePreferredName, setEmployeePreferredName] = useState("");
  const [employeeProfilePicture, setEmployeeProfilePicture] = useState("");
  // const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeSSN, setEmployeeSSN] = useState("");
  // ------ detail DOB Date -----
  const [employeeDOB, setEmployeeDOB] = useState("");
  const [employeeDOBDate, setEmployeeDOBDate] = useState(new Date());
  const [employeeGender, setEmployeeGender] = useState("");

  // ------ detail phone contact -----
  const [employeeContact, setEmployeeContact] = useState("");
  const [employeeCellPhoneContact, setEmployeeCellPhoneContact] = useState("");
  const [employeeWorkPhoneContact, setEmployeeWorkPhoneContact] = useState("");

  // ----- detail address -----
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeeBuildingAddress, setEmployeeBuildingAddress] = useState("");
  const [employeeStreetAddress, setEmployeeStreetAddress] = useState("");
  const [employeeCityAddress, setEmployeeCityAddress] = useState("");
  const [employeeStateAddress, setEmployeeStateAddress] = useState("");
  const [employeeZipAddress, setEmployeeZipAddress] = useState("");

  // ------ detail work authoriation -----
  const [employeeEmployment, setEmployeeEmployment] = useState("");  
  const [isPermanentResident, setIsPermanentResident] = useState("");
  const [perminantType, setPerminantType] = useState("");
  const [workAuthType, setWorkAuthType] = useState("");
  const [workAuthStartDate, setWorkAuthStartDate] = useState(new Date());
  const [workAuthEndDate, setWorkAuthEndDate] = useState(new Date());

  // ------ detail reference people -----
  const [employeeReference, setEmployeeReference] = useState("");
  const [employeeReferenceFirstName, setEmployeeReferenceFirstName] = useState("");
  const [employeeReferenceLastName, setEmployeeReferenceLastName] = useState("");
  const [employeeReferenceMiddleName, setEmployeeReferenceMiddleName] = useState("");
  const [employeeReferenceTele, setEmployeeReferenceTele] = useState("");
  const [employeeReferenceEmail, setEmployeeReferenceEmail] = useState("");
  const [employeeReferenceRelation, setEmployeeReferenceRelation] = useState("");

  // ------ detail emergency contact -----
  const [employeeEmergencyContact, setEmployeeEmergencyContact] = useState([]);
  const [employeeEmergencyFirstName, setEmployeeEmergencyFirstName] = useState("");
  const [employeeEmergencyLastName, setEmployeeEmergencyLastName] = useState("");
  const [employeeEmergencyMiddleName, setEmployeeEmergencyMiddleName] = useState("");
  const [employeeEmergencyEmail, setEmployeeEmergencyEmail] = useState("");
  const [employeeEmergencyPhone, setEmployeeEmergencyPhone] = useState("");
  const [employeeEmergencyRelation, setEmployeeEmergencyRelation] = useState("");

  // TODO: summary - no ideas how to handle
  const [employeeSummary, setEmployeeSummary] = useState([]);

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

  // const [resubmit, setResubmit] = useState(false);

  // const handleReSubmission = () => {
  //   setResubmit(!resubmit);
  // }

  const handleCreateEmployee = async () => {
    // TODO: Validation logic here...

    // const newEmployee = {
    //   firstName: employeeFirstName,
    //   lastName: employeeLastName,
    //   middleName: employeeMiddleName,
    //   preferredName: employeePreferredName,
    //   profilePicture: employeeProfilePicture,
    //   address: employeeAddress,
    //   contact: employeeContact,
    //   email: employeeEmail,
    //   SSN: employeeSSN,
    //   DOB: employeeDOB,
    //   gender: employeeGender,
    //   employment: employeeEmployment,
    //   reference: employeeReference,
    //   emergencyContact: employeeEmergencyContact,
    //   summary: employeeSummary
    // };

    // try {
    //   await dispatch(createProduct(newProduct)).unwrap();
    //   alert("Product has been created successfully.");
    //   navigate("/all-products");
    // } catch (error) {
    //   console.error("Error when creating a product", error.message);
    //   navigate("/error");
    // }
  };

  return (
    <Box p={{ base: 2, md: 4 }} maxW="800px" mx="auto" textColor="black">
      {/* ----- reject alert -----  */}
      <Alert 
        status='error'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Sorry, your application was rejected.
        </Box>

        <Box>
          <Button
            colorScheme="red"
            size="sm"
            // TODO: show feedback
          >See Feedback</Button>
          <Button
            colorScheme="blue"
            size="sm"
            marginLeft="3"
            // TODO: onClick={handleReSubmission}
          >Re-Submit Application</Button>
        </Box>
      </Alert>

      <Alert 
        status='warning'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Please wait for HR to review your application.
        </Box>

        <Button
          colorScheme="teal"
          size="sm"
          // TODO: onClick
        >Review Infos</Button>
      </Alert>

      {/* {resubmit && ( */}
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
                <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={employeeFirstName}
                      onChange={(e) => setEmployeeFirstName(e.target.value)}
                      {...inputStyles}
                      placeholder="firstname"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={employeeLastName}
                      onChange={(e) => setEmployeeLastName(e.target.value)}
                      {...inputStyles}
                      placeholder="lastname"
                    />
                </FormControl>
            </HStack>

            <HStack width="100%">
                <FormControl>
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    type="text"
                    value={employeeMiddleName}
                    onChange={(e) => setEmployeeMiddleName(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>
                <FormControl>
                    <FormLabel>Preferred Name</FormLabel>
                    <Input
                      type="text"
                      value={employeePreferredName}
                      onChange={(e) => setEmployeePreferredName(e.target.value)}
                      {...inputStyles}
                    />
                </FormControl>
            </HStack>

            <FormControl >
              <FormLabel>Profile Image</FormLabel>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar
                    size="lg"
                    // TODO: name={employeeFirstName}
                    src={employeeProfilePicture}
                  />
                  </Center>
                  <Center>
                  <Button
                    size="sm"
                    colorScheme="red"
                    // TODO: 
                  >Upload Avatar
                  </Button>
                </Center>
              </Stack>
            </FormControl>

            <FormControl isRequired isDisabled={true}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
              //   TODO: value这里是传进来的值，不能修改的
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>SSN</FormLabel>
              <Input
                type="text"
                value={employeeSSN}
                onChange={(e) => setEmployeeSSN(e.target.value)}
                {...inputStyles}
              />
            </FormControl>

            <HStack width="100%">
              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={employeeGender}
                  onChange={(e) => setEmployeeGender(e.target.value)}
                  placeholder='Select option'
                  {...inputStyles}
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='no-response'>I do not wish to answer.</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Data of Birth</FormLabel>
                <SingleDatepicker
                  date={employeeDOBDate}
                  onDateChange={date => setEmployeeDOBDate(date)}
                />
              </FormControl>
            </HStack>

            {/* ----- contact info part -----  */}
            <Divider />
            <Heading as="h3" fontSize="xl">
              Contact Infos
            </Heading>
            <HStack width="100%">
                <FormControl isRequired>
                  <FormLabel>Cell Phone Number</FormLabel>
                  <Input
                    type="text"
                    value={employeeCellPhoneContact}
                    onChange={(e) => setEmployeeCellPhoneContact(e.target.value)}
                    {...inputStyles}
                    placeholder="+1 (___) __-___-___"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Work Phone Number</FormLabel>
                  <Input
                    type="text"
                    value={employeeWorkPhoneContact}
                    onChange={(e) => setEmployeeWorkPhoneContact(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>
            </HStack>
            
            {/* ----- address part -----  */}
            <Divider />
            <Heading as="h3" fontSize="xl">
              Current Address
            </Heading>
            <FormControl>
              <FormLabel>Building / Apt Number</FormLabel>
                <Input
                type="text"
                value={employeeBuildingAddress}
                onChange={(e) => setEmployeeBuildingAddress(e.target.value)}
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Street Address</FormLabel>
                <Input
                type="text"
                value={employeeStreetAddress}
                onChange={(e) => setEmployeeStreetAddress(e.target.value)}
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  value={employeeCityAddress}
                  onChange={(e) => setEmployeeCityAddress(e.target.value)}
                  {...inputStyles}
              />
            </FormControl>

            <HStack width="100%">
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
                <Input
                type="text"
                value={employeeStateAddress}
                onChange={(e) => setEmployeeStateAddress(e.target.value)}
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Zip</FormLabel>
                <Input
                type="text"
                value={employeeZipAddress}
                onChange={(e) => setEmployeeZipAddress(e.target.value)}
                {...inputStyles}
              />
            </FormControl>
            </HStack>

            
            {/* ----- work auth part -----  */}
            <Divider />
            <Heading as="h3" fontSize="xl">
              Work Authoriation
            </Heading>
            <FormControl isRequired>
              <FormLabel>Permanent resident or citizen of the U.S.?</FormLabel>
              <Select
                onChange={(e) => setIsPermanentResident(e.target.value)}
                placeholder='Select option'
                {...inputStyles}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>

            {isPermanentResident === "yes" ? (
                <FormControl isRequired>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={perminantType}
                    onChange={(e) => setPerminantType(e.target.value)}
                    placeholder='Select option'
                    {...inputStyles}
                  >
                    <option value="green-card">Green Card</option>
                    <option value="citizen">Citizen</option>
                  </Select>
                  </FormControl>
            ) : isPermanentResident === "no" ? (
                <>
                <FormControl isRequired>
                  <FormLabel>What is your work authorization?</FormLabel>
                  <Select
                    value={workAuthType}
                    onChange={(e) => setWorkAuthType(e.target.value)}
                    placeholder='Select option'
                    {...inputStyles}
                  >
                    <option value="h1b">H1-B</option>
                    <option value="l2">L2</option>
                    <option value="f1">F1 (CPT/OPT)</option>
                    <option value="h4">H4</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>

                {workAuthType === "f1" ? (
                  <HStack>
                    <FormControl isRequired>
                      <input
                        type="file"
                      />
                      <Button
                        size="sm"
                        colorScheme="red"
                      >Upload OPT Receipt</Button>
                    </FormControl>
                  </HStack>
                ) : workAuthType === "other" ? (
                  <FormControl isRequired>
                    <Input
                      type="text"
                      value={workAuthType}
                      onChange={(e) => setWorkAuthType(e.target.value)}
                      {...inputStyles}
                    />
                  </FormControl>
                ) : (
                    <></>
                )}

                <HStack width="100%">
                  <FormControl isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <SingleDatepicker
                      date={workAuthStartDate}
                      onDateChange={date => setWorkAuthStartDate(date)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>End Date</FormLabel>
                    <SingleDatepicker
                      date={workAuthEndDate}
                      onDateChange={date => setWorkAuthEndDate(date)}
                    />
                  </FormControl>
                </HStack>
                </>
            ) : (
              <></>
            )}

            {/* ----- reference part -----  */}
            <Divider />
              <Heading as="h3" fontSize="xl">
                Reference Infos
              </Heading>
              <HStack width="100%">
                <FormControl isRequired>
                  <FormLabel>Referrer FirstName</FormLabel>
                    <Input
                    type="text"
                    value={employeeReferenceFirstName}
                    onChange={(e) => setEmployeeReferenceFirstName(e.target.value)}
                    {...inputStyles}
                    placeholder="referrer firstname"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Referrer LastName</FormLabel>
                    <Input
                    type="text"
                    value={employeeReferenceLastName}
                    onChange={(e) => setEmployeeReferenceLastName(e.target.value)}
                    {...inputStyles}
                    placeholder="referrer lastname"
                  />
                </FormControl>
              </HStack>

              <HStack width="100%">
                <FormControl>
                  <FormLabel>Referrer MiddleName</FormLabel>
                    <Input
                    type="text"
                    value={employeeReferenceMiddleName}
                    onChange={(e) => setEmployeeReferenceMiddleName(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Referrer Phone</FormLabel>
                    <Input
                    type="text"
                    value={employeeReferenceTele}
                    onChange={(e) => setEmployeeReferenceTele(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

              <HStack width="100%">
                <FormControl>
                  <FormLabel>Referrer Email</FormLabel>
                    <Input
                    type="text"
                    value={employeeReferenceEmail}
                    onChange={(e) => setEmployeeReferenceEmail(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Referrer Relationship</FormLabel>
                    <Input
                    type="text"
                    value={employeeReferenceRelation}
                    onChange={(e) => setEmployeeReferenceRelation(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

              {/* ----- emergency part -----  */}
              <Divider />
              <Heading as="h3" fontSize="xl">
                Emergency Contact / ICE
              </Heading>
              <HStack width="100%">
                <FormControl isRequired>
                  <FormLabel>ICE FirstName</FormLabel>
                    <Input
                    type="text"
                    value={employeeEmergencyFirstName}
                    onChange={(e) => setEmployeeEmergencyFirstName(e.target.value)}
                    {...inputStyles}
                    placeholder="emergency contact firstname"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>ICE LastName</FormLabel>
                    <Input
                    type="text"
                    value={employeeEmergencyLastName}
                    onChange={(e) => setEmployeeEmergencyLastName(e.target.value)}
                    {...inputStyles}
                    placeholder="emergency contact lastname"
                  />
                </FormControl>
                </HStack>

                <HStack width="100%">
                <FormControl>
                  <FormLabel>ICE MiddleName</FormLabel>
                    <Input
                    type="text"
                    value={employeeEmergencyMiddleName}
                    onChange={(e) => setEmployeeEmergencyMiddleName(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>ICE Phone</FormLabel>
                    <Input
                    type="text"
                    value={employeeEmergencyPhone}
                    onChange={(e) => setEmployeeEmergencyPhone(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

              <HStack width="100%">
                <FormControl>
                  <FormLabel>ICE Email</FormLabel>
                    <Input
                    type="text"
                    value={employeeEmergencyEmail}
                    onChange={(e) => setEmployeeEmergencyEmail(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>ICE Relationship</FormLabel>
                    <Input
                    type="text"
                    value={employeeEmergencyRelation}
                    onChange={(e) => setEmployeeEmergencyRelation(e.target.value)}
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

            {/* TODO: Summary */}

            <Button
              colorScheme="blue"
              type="button"
              onClick={handleCreateEmployee}
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </Box>
      {/* )} */}
    </Box>
  );
};

export default OnBoardingPage;
