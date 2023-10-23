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
import { useFormik } from "formik";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../store/configureStore";
import { EmployeeInfo } from "../types/employee";

const ReviewOnboarding = () => {

  const navigate = useNavigate();
  const formData = useSelector<RootState, EmployeeInfo>(
    (state) => state.onboarding.data as EmployeeInfo
  );
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
      <Button colorScheme="blue" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Box>
        <Heading as="h1" mb="4">
          Review Infos
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
                  value={formData.firstName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={formData.lastName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>
            </HStack>

            <HStack width="100%">
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  type="text"
                  value={formData.middleName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Preferred Name</FormLabel>
                <Input
                  type="text"
                  value={formData.preferredName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Profile Image</FormLabel>

              <Center>
                <Avatar
                  size="lg"
                  // hardcode here
                  src={formData.profilePicture || "https://bit.ly/dan-abramov"}
                />
              </Center>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={formData.email}
                readOnly
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>SSN</FormLabel>
              <Input
                type="text"
                value={formData.SSN}
                readOnly
                {...inputStyles}
              />
            </FormControl>

            <HStack width="100%">
              <FormControl isRequired isDisabled>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={formData.gender}
                  placeholder="Select option"
                  {...inputStyles}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="no-response">I do not wish to answer.</option>
                </Select>
              </FormControl>

              <FormControl isRequired isDisabled>
                <FormLabel>Date of Birth</FormLabel>
                <SingleDatepicker
                  name="DOB"
                  date={formData.DOB}
                  onDateChange={() => {}}
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
                  value={formData.Contact.cellPhoneNumber}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>Work Phone Number</FormLabel>
                <Input
                  type="text"
                  value={formData.Contact.workPhoneNumber}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>
            </HStack>

            {/* ----- address part -----  */}
            <Divider />
            <Heading as="h3" fontSize="xl">
              Current Address
            </Heading>
            <FormControl isRequired>
              <FormLabel>Building / Apt Number</FormLabel>
              <Input
                type="text"
                value={formData.address.buildingAptNumber}
                {...inputStyles}
                readOnly
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Street Address</FormLabel>
              <Input
                type="text"
                value={formData.address.streetName}
                {...inputStyles}
                readOnly
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                value={formData.address.city}
                {...inputStyles}
                readOnly
              />
            </FormControl>

            <HStack width="100%">
              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  type="text"
                  value={formData.address.state}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Zip</FormLabel>
                <Input
                  type="text"
                  value={formData.address.zip}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>
            </HStack>

            {/* ----- work auth part -----  */}
            <Divider />
            <Heading as="h3" fontSize="xl">
              Work Authoriation
            </Heading>
            <FormControl isRequired isDisabled>
              <FormLabel>Permanent resident or citizen of the U.S.?</FormLabel>
              <Select value={formData.isPermanentResident} {...inputStyles}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormControl>

            {formData.isPermanentResident === "Yes" ? (
              <FormControl isRequired isDisabled>
                <FormLabel>Type</FormLabel>
                <Select value={formData.employment.visaTitle} {...inputStyles}>
                  <option value="green-card">Green Card</option>
                  <option value="citizen">Citizen</option>
                </Select>
              </FormControl>
            ) : formData.isPermanentResident === "No" ? (
              <>
                <FormControl isRequired isDisabled>
                  <FormLabel>What is your work authorization?</FormLabel>
                  <Select
                    value={formData.employment.visaTitle}
                    {...inputStyles}
                  >
                    <option value="h1b">H1-B</option>
                    <option value="l2">L2</option>
                    <option value="f1">F1 (CPT/OPT)</option>
                    <option value="h4">H4</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>

                {formData.employment.visaTitle === "f1" ? (
                  <HStack>
                    <FormControl>
                      <Input type="file" />
                      <Button size="sm" colorScheme="red">
                        Upload OPT Receipt
                      </Button>
                    </FormControl>
                  </HStack>
                ) : formData.employment.visaTitle === "other" ? (
                  <FormControl>
                    <Input
                      type="text"
                      value={formData.employment.visaTitle}
                      isDisabled
                      {...inputStyles}
                    />
                  </FormControl>
                ) : null}

                <HStack width="100%">
                  <FormControl isRequired isDisabled>
                    <FormLabel>Start Date</FormLabel>
                    <SingleDatepicker
                      name="employment.startDate"
                      date={formData.employment.startDate}
                      onDateChange={() => {}}
                    />
                  </FormControl>

                  <FormControl isRequired isDisabled>
                    <FormLabel>End Date</FormLabel>
                    <SingleDatepicker
                      name="employment.endDate"
                      date={formData.employment.endDate}
                      onDateChange={() => {}}
                    />
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
              <FormControl isRequired>
                <FormLabel>Referrer FirstName</FormLabel>
                <Input
                  type="text"
                  value={formData.reference?.firstName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Referrer LastName</FormLabel>
                <Input
                  type="text"
                  value={formData.reference.lastName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>
            </HStack>

            <HStack width="100%">
              <FormControl>
                <FormLabel>Referrer MiddleName</FormLabel>
                <Input
                  type="text"
                  value={formData.reference.middleName}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>Referrer Phone</FormLabel>
                <Input
                  type="text"
                  value={formData.reference.phone}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>
            </HStack>

            <HStack width="100%">
              <FormControl>
                <FormLabel>Referrer Email</FormLabel>
                <Input
                  type="text"
                  value={formData.reference.phone}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Referrer Relationship</FormLabel>
                <Input
                  type="text"
                  value={formData.reference.relationship}
                  {...inputStyles}
                  readOnly
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
                  value={formData.emergencyContact.firstName}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>ICE LastName</FormLabel>
                <Input
                  type="text"
                  value={formData.emergencyContact.lastName}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>
            </HStack>

            <HStack width="100%">
              <FormControl>
                <FormLabel>ICE MiddleName</FormLabel>
                <Input
                  type="text"
                  value={formData.emergencyContact.middleName}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>ICE Phone</FormLabel>
                <Input
                  type="text"
                  value={formData.emergencyContact?.phone}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>
            </HStack>

            <HStack width="100%">
              <FormControl>
                <FormLabel>ICE Email</FormLabel>
                <Input
                  type="text"
                  value={formData.emergencyContact.email}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>ICE Relationship</FormLabel>
                <Input
                  type="text"
                  value={formData.emergencyContact.relationship}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>
            </HStack>

            {/* TODO: Summary */}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewOnboarding;
