import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchEmployeeInfo } from "../store/reducers/employee";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import { useSelector } from "react-redux";
import { EmployeeInfo } from "../types/employee";
import {
  Avatar,
  Box,
  Text,
  Center,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  VStack,
  Button,
} from "@chakra-ui/react";
import MyWidget from "../components/MyWidget";

const HRReviewInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [employeeInfo, setEmployeeInfo] = useState({} as EmployeeInfo);
  const [isLoading, setIsLoading] = useState(true);

  // get params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId") as string;
  const isFromHiring = queryParams.get("from") === "hiring";

  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(fetchEmployeeInfo(userId)).unwrap();
        setEmployeeInfo(res);
        setIsLoading(false);
      } catch (error) {
        console.log("Review Info Error: ", error);
      }
    })();
    console.log("Employee Info: ", employeeInfo);
  }, []);

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

  if (isLoading) {
    return (
      <Box
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>Loading...</Heading>
      </Box>
    );
  }

  return (
    <Box p={{ base: 2, md: 4 }} maxW="800px" mx="auto" textColor="black">
      <Box>
        {isFromHiring && (
          <Button colorScheme="blue" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        )}
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
                  value={employeeInfo.firstName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.lastName}
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
                  value={employeeInfo.middleName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Preferred Name</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.preferredName}
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
                  src={
                    employeeInfo.profilePicture || "https://bit.ly/dan-abramov"
                  }
                />
              </Center>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={employeeInfo.email}
                readOnly
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>SSN</FormLabel>
              <Input
                type="text"
                value={employeeInfo.SSN}
                readOnly
                {...inputStyles}
              />
            </FormControl>

            <HStack width="100%">
              <FormControl isRequired isDisabled>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={employeeInfo.gender}
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
                <Input value={employeeInfo.DOB?.toString().slice(0, 10)} />
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
                  value={employeeInfo.Contact?.cellPhoneNumber}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>Work Phone Number</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.Contact?.workPhoneNumber}
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
                value={employeeInfo.address?.buildingAptNumber}
                {...inputStyles}
                readOnly
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Street Address</FormLabel>
              <Input
                type="text"
                value={employeeInfo.address?.streetName}
                {...inputStyles}
                readOnly
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                value={employeeInfo.address?.city}
                {...inputStyles}
                readOnly
              />
            </FormControl>

            <HStack width="100%">
              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.address?.state}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Zip</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.address?.zip}
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
              <Select value={employeeInfo.isPermanentResident} {...inputStyles}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormControl>

            {employeeInfo.isPermanentResident === "Yes" ? (
              <FormControl isRequired isDisabled>
                <FormLabel>Type</FormLabel>
                <Select
                  value={employeeInfo.employment?.visaTitle}
                  {...inputStyles}
                >
                  <option value="green-card">Green Card</option>
                  <option value="citizen">Citizen</option>
                </Select>
              </FormControl>
            ) : employeeInfo.isPermanentResident === "No" ? (
              <>
                <FormControl isRequired isDisabled>
                  <FormLabel>What is your work authorization?</FormLabel>
                  <Select
                    value={employeeInfo.employment?.visaTitle}
                    {...inputStyles}
                  >
                    <option value="h1b">H1-B</option>
                    <option value="l2">L2</option>
                    <option value="f1">F1 (CPT/OPT)</option>
                    <option value="h4">H4</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>

                {employeeInfo.employment?.visaTitle === "f1" ? (
                  <HStack>
                    <Text>PLACEHOLDER: Uploaded Files</Text>
                  </HStack>
                ) : employeeInfo.employment?.visaTitle === "other" ? (
                  <FormControl>
                    <Input
                      type="text"
                      value={employeeInfo.employment.visaTitle}
                      isDisabled
                      {...inputStyles}
                    />
                  </FormControl>
                ) : null}

                <HStack width="100%">
                  <FormControl isRequired isDisabled>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      value={employeeInfo.employment?.startDate
                        .toString()
                        .slice(0, 10)}
                    />
                  </FormControl>

                  <FormControl isRequired isDisabled>
                    <FormLabel>End Date</FormLabel>
                    <Input
                      value={employeeInfo.employment?.endDate
                        .toString()
                        .slice(0, 10)}
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
                  value={employeeInfo.reference?.firstName}
                  readOnly
                  {...inputStyles}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Referrer LastName</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.reference?.lastName}
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
                  value={employeeInfo.reference?.middleName}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>Referrer Phone</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.reference?.phone}
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
                  value={employeeInfo.reference?.phone}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Referrer Relationship</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.reference?.relationship}
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
                  value={employeeInfo.emergencyContact?.firstName}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>ICE LastName</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.emergencyContact?.lastName}
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
                  value={employeeInfo.emergencyContact?.middleName}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>ICE Phone</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.emergencyContact?.phone}
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
                  value={employeeInfo.emergencyContact?.email}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>ICE Relationship</FormLabel>
                <Input
                  type="text"
                  value={employeeInfo.emergencyContact?.relationship}
                  {...inputStyles}
                  readOnly
                />
              </FormControl>
            </HStack>

            {/* TODO: Summary */}
          </VStack>
        </Box>
      </Box>
      {isFromHiring && <MyWidget />}
    </Box>
  );
};

export default HRReviewInfo;
