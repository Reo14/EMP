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
  Center
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

const PersonalInfoPage: FC = () => {
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

  return (
    <Box 
      p="5"
      maxW='xl'
      mx="auto"
      borderWidth='1px' 
      borderRadius='lg' 
      overflow='hidden'
      textColor="black"
    >
      
      <Box
        p="5"
      >
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
                <Button
                  size="sm"
                  colorScheme="red"
                  isDisabled={!isEditing}
                  // TODO: 
                >Upload Avatar
                </Button>
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
      </Box>
    </Box>
  );
};

export default PersonalInfoPage;