import { FC } from "react";
import { Heading, Box } from "@chakra-ui/react";

const EmployeeVisaPage: FC = () => {

  return (
    <Box 
      p="5"
      maxW='sm' 
      borderWidth='1px' 
      borderRadius='lg' 
      overflow='hidden'
      textColor="black"
    >
     <Heading>Employee Visa Management Page</Heading>
    </Box>
  );
};

export default EmployeeVisaPage;