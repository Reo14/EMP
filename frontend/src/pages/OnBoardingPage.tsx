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
  Text
} from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
// import { createProduct } from "../store/reducers/productSlice";

// enum ApplicationStatus {
//   PENDING = "Pending",
//   APPROVED = "Approved",
//   REJECTED = "Rejected"
// }

const OnBoardingPage: FC = () => {
  const status = useSelector((state) => state);

  // TODO: redirect
  // if (status === ApplicationStatus.APPROVED) {
  //   return <Redirect to="/home" />;
  // }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employeeFirstName, setEmployeeFirstName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");
  const [employeeMiddleName, setEmployeeMiddleName] = useState("");
  const [employeePreferredName, setEmployeePreferredName] = useState("");
  const [employeeProfilePicture, setEmployeeProfilePicture] = useState("");

  const [employeeAddress, setEmployeeAddress] = useState("");
  // ----- detail address -----
  const [employeeStreetAddress, setEmployeeStreetAddress] = useState("");
  const [employeeCityAddress, setEmployeeCityAddress] = useState("");
  const [employeeStateAddress, setEmployeeStateAddress] = useState("");
  const [employeeZipAddress, setEmployeeZipAddress] = useState("");

  const [employeeContact, setEmployeeContact] = useState("");
  // ------ detail phone contact -----
  const [employeeCellPhoneContact, setEmployeeCellPhoneContact] = useState("");
  const [employeeWorkPhoneContact, setEmployeeWorkPhoneContact] = useState("");
  
//   const [employeeEmail, setEmployeeEmail] = useState("");

  const [employeeSSN, setEmployeeSSN] = useState("");

  const [employeeDOB, setEmployeeDOB] = useState("");
  // ------ detail DOB Date -----
  const [employeeDOBDate, setEmployeeDOBDate] = useState<Date|null> (new Date());
  const [employeeGender, setEmployeeGender] = useState("");

  const [employeeEmployment, setEmployeeEmployment] = useState("");
  // ------ detail work authoriation -----
  const [isPermanentResident, setIsPermanentResident] = useState("");
  const [perminantType, setPerminantType] = useState("");
  const [workAuthType, setWorkAuthType] = useState("");
  const [workAuthStartDate, setWorkAuthStartDate] = useState<Date|null> (new Date());
  const [workAuthEndDate, setWorkAuthEndDate] = useState<Date|null> (new Date());

  const [employeeReference, setEmployeeReference] = useState("");
  // ------ detail reference people -----
  const [employeeReferenceFirstName, setEmployeeReferenceFirstName] = useState("");
  const [employeeReferenceLastName, setEmployeeReferenceLastName] = useState("");
  const [employeeReferenceEmail, setEmployeeReferenceEmail] = useState("");
  const [employeeReferenceRelation, setEmployeeReferenceRelation] = useState("");

  const [employeeEmergencyContact, setEmployeeEmergencyContact] = useState([]);
  // ------ detail emergency contact -----
  const [employeeEmergencyFirstName, setEmployeeEmergencyFirstName] = useState("");
  const [employeeEmergencyLastName, setEmployeeEmergencyLastName] = useState("");
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
    <Box p={{ base: 2, md: 4 }} maxW="600px" mx="auto" textColor="black">
      <VStack
      display="flex"
      direction="column"
      justify="center"
      h="100%"
      spacing="20px"
    >
      <Text color="black">Login/Sign Up Successful</Text>
    </VStack>

      <Heading as="h1" mb="4">
        Collect Infos
      </Heading>
      <Box boxShadow="dark-lg" p="6" rounded="md" bg="white">
        <VStack spacing="6">
          <Text fontSize="xl">
            Basic Infos
          </Text>
          <HStack>
            <Box>
              <FormControl isRequired>
                  <FormLabel>FirstName</FormLabel>
                  <Input
                    type="text"
                    value={employeeFirstName}
                    onChange={(e) => setEmployeeFirstName(e.target.value)}
                    {...inputStyles}
                    placeholder="firstname"
                  />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                  <FormLabel>LastName</FormLabel>
                  <Input
                    type="text"
                    value={employeeLastName}
                    onChange={(e) => setEmployeeLastName(e.target.value)}
                    {...inputStyles}
                    placeholder="lastname"
                  />
              </FormControl>
            </Box>
          </HStack>

          <HStack>
            <Box>
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  type="text"
                  value={employeeMiddleName}
                  onChange={(e) => setEmployeeMiddleName(e.target.value)}
                  {...inputStyles}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                  <FormLabel>Preferred Name</FormLabel>
                  <Input
                    type="text"
                    value={employeePreferredName}
                    onChange={(e) => setEmployeePreferredName(e.target.value)}
                    {...inputStyles}
                  />
              </FormControl>
            </Box>
          </HStack>

          
            <FormControl>
              <FormLabel>Profile Image</FormLabel>
              <Avatar
              //   name={employeeFirstName}
                src={employeeProfilePicture}
              />
              <Button
                size="sm"
                colorScheme="red"
                // TODO: 
              >Upload Avatar</Button>
            </FormControl>
          

          
          <Text fontSize="xl">
            Current Address
          </Text>
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
          

          <HStack>
            <Box>
              <FormControl isRequired>
                <FormLabel>Cell Phone Number</FormLabel>
                <Input
                  type="text"
                  value={employeeCellPhoneContact}
                  onChange={(e) => setEmployeeCellPhoneContact(e.target.value)}
                  {...inputStyles}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Work Phone Number</FormLabel>
                <Input
                  type="text"
                  value={employeeWorkPhoneContact}
                  onChange={(e) => setEmployeeWorkPhoneContact(e.target.value)}
                  {...inputStyles}
                />
              </FormControl>
            </Box>
          </HStack>

          <FormControl isRequired isDisabled={true}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
            //   TODO: value这里是传进来的值，不能修改的
              {...inputStyles}
            />
          </FormControl>

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
            <FormLabel>SSN</FormLabel>
            <Input
              type="text"
              value={employeeSSN}
              onChange={(e) => setEmployeeSSN(e.target.value)}
              {...inputStyles}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Data of Birth</FormLabel>
            <ReactDatePicker
              selected={employeeDOBDate}
              onChange={(date: Date | null) => setEmployeeDOBDate(date)}
            />
          </FormControl>

          <Text fontSize="xl">
            Work Authorization
          </Text>
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
          ) : (
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

              <HStack>
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <ReactDatePicker 
                  selected={workAuthStartDate}
                  onChange={(date: Date | null) => setWorkAuthStartDate(date)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <ReactDatePicker 
                  selected={workAuthEndDate}
                  onChange={(date: Date | null) => setWorkAuthEndDate(date)}
                />
              </FormControl>
              </HStack>
              </>
          )}

            <Text fontSize="xl">
              Reference Infos
            </Text>
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

            <Text fontSize="xl">
              Emergency Contact
            </Text>
            <FormControl isRequired>
              <FormLabel>Emergency Contact FirstName</FormLabel>
                <Input
                type="text"
                value={employeeEmergencyFirstName}
                onChange={(e) => setEmployeeEmergencyFirstName(e.target.value)}
                {...inputStyles}
                placeholder="emergency contact firstname"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Emergency Contact LastName</FormLabel>
                <Input
                type="text"
                value={employeeEmergencyLastName}
                onChange={(e) => setEmployeeEmergencyLastName(e.target.value)}
                {...inputStyles}
                placeholder="emergency contact lastname"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Emergency Contact Tele</FormLabel>
                <Input
                type="text"
                value={employeeEmergencyPhone}
                onChange={(e) => setEmployeeEmergencyPhone(e.target.value)}
                {...inputStyles}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Emergency Contact Email</FormLabel>
                <Input
                type="text"
                value={employeeEmergencyEmail}
                onChange={(e) => setEmployeeEmergencyEmail(e.target.value)}
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Emergency Contact Relationship</FormLabel>
                <Input
                type="text"
                value={employeeEmergencyRelation}
                onChange={(e) => setEmployeeEmergencyRelation(e.target.value)}
                {...inputStyles}
              />
            </FormControl>

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
  );
};

export default OnBoardingPage;
