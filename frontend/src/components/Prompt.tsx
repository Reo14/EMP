import React, { FC } from "react";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface MyPromptProps {
  status: "loading" | "info" | "warning" | "success" | "error" | undefined,
  title: string;
  description: string;
}

const Prompt: FC<MyPromptProps> = ({ status, title, description }) => {
  return (
    <>
      <Alert status={status}>
        <AlertIcon />
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Box>
      </Alert>
    </>
  );
};

export default Prompt;
