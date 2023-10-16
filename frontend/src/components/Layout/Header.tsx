import { FC } from "react";
import { Flex, HStack, Heading, Text, Box } from "@chakra-ui/react";

const Header: FC = () =>{
  return (
    <Box
      px="25"
      pt="2"
      bg="black"
      height="70px" 
    >
      <Flex
        align="center"
        justify="space-between"
        flexDirection="row"
      >
        <>
        <HStack textColor="white" spacing="1">
          <Heading as="h1">Management</Heading>
          <Text fontSize="lg" mt="4" fontWeight="bold">
            Chuwa
          </Text>
          </HStack>
        </>
      </Flex>
    </Box>
  );
};

export default Header;