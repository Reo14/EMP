import { FC } from "react";
import { Flex, HStack, Heading, Text, Box } from "@chakra-ui/react";

const Header: FC = () =>{
  return (
    <Box
      px="25"
      bg="gray.200"
      height="85px"
    >
      <Heading
        as="h1" color="blue.500" lineHeight="85px"
      >
        Welcome
      </Heading>
    </Box>
  );
};

export default Header;