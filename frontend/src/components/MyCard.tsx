import React, { FC, ReactNode } from "react";
import { Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface MyCardProps {
  title: string;
  children: ReactNode;
}

const MyCard: FC<MyCardProps> = ({ title, children }) => {
  // 暂时去掉了之前的close button，感觉并不需要，因为只要不登陆就一直在登陆界面

  return (
    <Box
      position="relative"
      p="5"
      border="1px solid"
      borderColor="gray.300"
      boxShadow="md"
      borderRadius="md"
      textColor="black"
      w={["90%", "50%"]}
      m="auto"
      my={["20%", "10%"]}
    >
      <Center fontSize="2xl" my="2" fontWeight="bold" >
        {title}
      </Center>
      {children}
    </Box>
  );
};

export default MyCard;
