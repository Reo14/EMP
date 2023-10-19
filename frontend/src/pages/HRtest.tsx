import React, { ChangeEvent } from "react";
import { Flex, Text, Input, Button, Spacer } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

const hrId = "HR123456";
const employeeName = "John Doe";

const HRtest = () => {
  const [email, setEmail] = React.useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/hr/registration/send",
        {
          email,
          hrId,
          employeeName,
        }
      );
      alert("Email sent");
      console.log(response.data);
    } catch (err) {
      const axiosErr = err as AxiosError;
      console.log(axiosErr.response?.data);
    }
  };
  
  return (
    <Flex h="100%" direction="column" justify="space-between" align="center">
      <Text fontSize="6xl" fontWeight="bold" color="black">
        HRtest
      </Text>
      <Text fontSize="2xl" color="black">
        Candidate Email:
      </Text>
      <Input
        variant="outline"
        border="1px"
        width="33%"
        value={email}
        onChange={onChange}
      />
      <Button mb="5" colorScheme="blue" onClick={onSubmit}>
        Send
      </Button>
    </Flex>
  );
};

export default HRtest;
