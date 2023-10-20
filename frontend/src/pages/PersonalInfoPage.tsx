import { FC, useState } from "react";
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
  Flex
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

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

const NameForm: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  }

  return (
    <>
      <HStack>
        <Heading as="h3" size="lg">Name Infos</Heading>
        {isEditing ? (
          <>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleCancelOnClick}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={handleSaveOnClick}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            colorScheme="teal"
            onClick={handleEditOnClick}
          >
            Edit
          </Button>
        )}
      </HStack>

      <HStack>
        <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          value={employeeFirstName}
          onChange={(e) => setEmployeeFirstName(e.target.value)}
          {...inputStyles}
          placeholder="firstname"
          isDisabled={!isEditing}
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
            isDisabled={!isEditing}
          />
          </FormControl>
      </HStack>

      <HStack>
          <FormControl>
            <FormLabel>Middle Name</FormLabel>
            <Input
              type="text"
              value={employeeMiddleName}
              onChange={(e) => setEmployeeMiddleName(e.target.value)}
              {...inputStyles}
              isDisabled={!isEditing}
            />
          </FormControl>
          <FormControl>
              <FormLabel>Preferred Name</FormLabel>
              <Input
                type="text"
                value={employeePreferredName}
                onChange={(e) => setEmployeePreferredName(e.target.value)}
                {...inputStyles}
                isDisabled={!isEditing}
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

        <FormControl isRequired>
          <FormLabel>SSN</FormLabel>
          <Input
            type="text"
            value={employeeSSN}
            onChange={(e) => setEmployeeSSN(e.target.value)}
            {...inputStyles}
            isDisabled={!isEditing}
          />
        </FormControl>

      <HStack>
        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            value={employeeGender}
            onChange={(e) => setEmployeeGender(e.target.value)}
            placeholder='Select option'
            {...inputStyles}
            isDisabled={!isEditing}
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
            disabled={!isEditing}
          />
        </FormControl>
      </HStack>
    </>
  );
}

const AddressForm: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeeBuildingAddress, setEmployeeBuildingAddress] = useState("");
  const [employeeStreetAddress, setEmployeeStreetAddress] = useState("");
  const [employeeCityAddress, setEmployeeCityAddress] = useState("");
  const [employeeStateAddress, setEmployeeStateAddress] = useState("");
  const [employeeZipAddress, setEmployeeZipAddress] = useState("");

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  }

  return (
    <>
      <HStack>
        <Heading as="h3" size="lg">Address Infos</Heading>
        {isEditing ? (
          <>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleCancelOnClick}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={handleSaveOnClick}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            colorScheme="teal"
            onClick={handleEditOnClick}
          >
            Edit
          </Button>
        )}
      </HStack>

      <FormControl>
        <FormLabel>Building / Apt Number</FormLabel>
          <Input
          type="text"
          value={employeeBuildingAddress}
          onChange={(e) => setEmployeeBuildingAddress(e.target.value)}
          {...inputStyles}
          isDisabled={!isEditing}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Street Address</FormLabel>
          <Input
          type="text"
          value={employeeStreetAddress}
          onChange={(e) => setEmployeeStreetAddress(e.target.value)}
          {...inputStyles}
          isDisabled={!isEditing}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>City</FormLabel>
          <Input
            type="text"
            value={employeeCityAddress}
            onChange={(e) => setEmployeeCityAddress(e.target.value)}
            {...inputStyles}
            isDisabled={!isEditing}
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
            isDisabled={!isEditing}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Zip</FormLabel>
            <Input
            type="text"
            value={employeeZipAddress}
            onChange={(e) => setEmployeeZipAddress(e.target.value)}
            {...inputStyles}
            isDisabled={!isEditing}
          />
        </FormControl>
      </HStack>
    </>
  );
}

const ContactInfoForm: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // const [employeeContact, setEmployeeContact] = useState("");
  const [employeeCellPhoneContact, setEmployeeCellPhoneContact] = useState("");
  const [employeeWorkPhoneContact, setEmployeeWorkPhoneContact] = useState("");

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  }

  return (
    <>
      <HStack>
        <Heading as="h3" size="lg">Contact Infos</Heading>
        {isEditing ? (
          <>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleCancelOnClick}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={handleSaveOnClick}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            colorScheme="teal"
            onClick={handleEditOnClick}
          >
            Edit
          </Button>
        )}
      </HStack>

      <HStack width="100%">
        <FormControl isRequired>
          <FormLabel>Cell Phone Number</FormLabel>
          <Input
            type="text"
            value={employeeCellPhoneContact}
            onChange={(e) => setEmployeeCellPhoneContact(e.target.value)}
            {...inputStyles}
            placeholder="+1 (___) __-___-___"
            isDisabled={!isEditing}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Work Phone Number</FormLabel>
          <Input
            type="text"
            value={employeeWorkPhoneContact}
            onChange={(e) => setEmployeeWorkPhoneContact(e.target.value)}
            {...inputStyles}
            isDisabled={!isEditing}
          />
        </FormControl>
      </HStack>
    </>
  );
}

const EmploymentForm: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // const [employeeContact, setEmployeeContact] = useState("");
  const [employeeEmployment, setEmployeeEmployment] = useState("");  
  const [isPermanentResident, setIsPermanentResident] = useState("");
  const [perminantType, setPerminantType] = useState("");
  const [workAuthType, setWorkAuthType] = useState("");
  const [workAuthStartDate, setWorkAuthStartDate] = useState(new Date());
  const [workAuthEndDate, setWorkAuthEndDate] = useState(new Date());

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  }

  return (
    <>
      <HStack>
        <Heading as="h3" size="lg">Employment Infos</Heading>
        {isEditing ? (
          <>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleCancelOnClick}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={handleSaveOnClick}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            colorScheme="teal"
            onClick={handleEditOnClick}
          >
            Edit
          </Button>
        )}
      </HStack>

      <FormControl isRequired>
        <FormLabel>Permanent resident or citizen of the U.S.?</FormLabel>
        <Select
          onChange={(e) => setIsPermanentResident(e.target.value)}
          placeholder='Select option'
          {...inputStyles}
          isDisabled={!isEditing}
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
              isDisabled={!isEditing}
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
              isDisabled={!isEditing}
            >
              <option value="h1b">H1-B</option>
              <option value="l2">L2</option>
              <option value="f1">F1 (CPT/OPT)</option>
              <option value="h4">H4</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          {workAuthType === "f1" ? (
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
          ) : workAuthType === "other" ? (
            <FormControl isRequired>
              <FormLabel>Please specify your working authoriation.</FormLabel>
              <Input
                type="text"
                value={workAuthType}
                onChange={(e) => setWorkAuthType(e.target.value)}
                {...inputStyles}
                isDisabled={!isEditing}
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
                disabled={!isEditing}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <SingleDatepicker
                date={workAuthEndDate}
                onDateChange={date => setWorkAuthEndDate(date)}
                disabled={!isEditing}
              />
            </FormControl>
          </HStack>
          </>
      ) : (
        <></>
      )}
    </>
  );
}

const EmergencyContactForm: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [employeeEmergencyContact, setEmployeeEmergencyContact] = useState([]);
  const [employeeEmergencyFirstName, setEmployeeEmergencyFirstName] = useState("");
  const [employeeEmergencyLastName, setEmployeeEmergencyLastName] = useState("");
  const [employeeEmergencyMiddleName, setEmployeeEmergencyMiddleName] = useState("");
  const [employeeEmergencyEmail, setEmployeeEmergencyEmail] = useState("");
  const [employeeEmergencyPhone, setEmployeeEmergencyPhone] = useState("");
  const [employeeEmergencyRelation, setEmployeeEmergencyRelation] = useState("");

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleCancelOnClick = () => {
    setIsEditing(false);
  };

  const handleSaveOnClick = () => {
    // TODO: save logic
    setIsEditing(false);
  }

  return (
    <>
      <HStack>
        <Heading as="h3" size="lg">Contact Infos</Heading>
        {isEditing ? (
          <>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleCancelOnClick}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={handleSaveOnClick}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            colorScheme="teal"
            onClick={handleEditOnClick}
          >
            Edit
          </Button>
        )}
      </HStack>

      <HStack width="100%">
        <FormControl isRequired>
          <FormLabel>ICE FirstName</FormLabel>
            <Input
            type="text"
            value={employeeEmergencyFirstName}
            onChange={(e) => setEmployeeEmergencyFirstName(e.target.value)}
            {...inputStyles}
            placeholder="emergency contact firstname"
            isDisabled={!isEditing}
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
            isDisabled={!isEditing}
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
            isDisabled={!isEditing}
          />
        </FormControl>

        <FormControl>
          <FormLabel>ICE Phone</FormLabel>
            <Input
            type="text"
            value={employeeEmergencyPhone}
            onChange={(e) => setEmployeeEmergencyPhone(e.target.value)}
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
            value={employeeEmergencyEmail}
            onChange={(e) => setEmployeeEmergencyEmail(e.target.value)}
            {...inputStyles}
            isDisabled={!isEditing}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>ICE Relationship</FormLabel>
            <Input
            type="text"
            value={employeeEmergencyRelation}
            onChange={(e) => setEmployeeEmergencyRelation(e.target.value)}
            {...inputStyles}
            isDisabled={!isEditing}
          />
        </FormControl>
      </HStack>
    </>
  );
}

// TODO: 
const DocumentForm: FC = () => {
  return (
    <>
      <Heading>Documents</Heading>
    </>
  );
}

const PersonalInfoPage: FC = () => {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(16.67);

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={6}
      m="10px auto"
      as="form">
      <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
      { 
        step === 1 ? <NameForm /> : 
        step === 2 ? <AddressForm /> : 
        step === 3 ? <ContactInfoForm /> :
        step === 4 ? <EmploymentForm /> :
        step === 5 ? <EmergencyContactForm /> :
        <DocumentForm />
      }

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
              // TODO: onClick={() => {}}
            >
              Submit
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>
    </Box>
  );
};

export default PersonalInfoPage;