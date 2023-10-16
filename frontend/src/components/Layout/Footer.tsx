import React, { FC } from "react";
import {
  Flex,
  Center,
  Text,
} from "@chakra-ui/react";

const Footer: FC = () => {
  return (
    <Flex h="100%" px="64px" pb="8px" align="center" justify="space-between">
      <Center w="auto">
        <Text color={"white"}>©2023, All Rights Reserved</Text>
      </Center>
    </Flex>
  );
};

export default Footer;
