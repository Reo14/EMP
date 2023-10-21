import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Text,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { signIn } from "../store/reducers/auth";
import Prompt from "../components/Prompt";
import MyCard from "../components/MyCard";
import { AppDispatch } from "../store/configureStore";

const SignIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const buttonStyles = {
    my: "2",
    bg: "#5048E5",
    w: "100%",
    textColor: "white",
    _hover: {
      bg: "rgba(80, 72, 229, 0.9)",
    },
  };

  const handleClick = () => setShowPassword(!showPassword);

  const onUsernameBlur = () => {
    if (!username) {
      setUsernameError("This field is required");
    }
  };

  const onPasswordBlur = () => {
    if (!password) {
      setPasswordError("This field is required");
    }
  };

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (!e.target.value) {
      setUsernameError("This field is required");
    } else {
      setUsernameError("");
    }
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordError("This field is required");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    if (!username) {
      setUsernameError("This field is required");
      return;
    }
    if (!password) {
      setPasswordError("This field is required");
      return;
    }

    dispatch(signIn({ username, password }));
    alert("Signed In Successfully");
    navigate("/success");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <MyCard title="Welcome">
          <Box mb="5">
            <Text textColor="gray">Username:</Text>
            <Input
              type="text"
              value={username}
              onChange={onUsernameChange}
              onKeyDown={handleKeyDown}
              onBlur={onUsernameBlur}
              placeholder="Enter your username"
              {...inputStyles}
              borderColor={usernameError ? "red.500" : "gray.300"}
            />
            {usernameError && (
              <Text color="red.500" fontSize="sm" float="right">
                {usernameError}
              </Text>
            )}
          </Box>
          <Box mb="5">
            <Text textColor="gray">Password:</Text>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onPasswordChange}
                onKeyDown={handleKeyDown}
                onBlur={onPasswordBlur}
                placeholder="Enter your password"
                {...inputStyles}
              />
              <InputRightElement mt="5px" mr="15px">
                <Button color="gray.500" onClick={handleClick}>
                  <Text decoration="underline">
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordError && (
              <Text color="red.500" fontSize="sm" mt="1" float="right">
                {passwordError}
              </Text>
            )}
          </Box>
          <Button {...buttonStyles} onClick={handleLogin}>
            Sign In
          </Button>
          <Box
            display="flex"
            justifyContent="space-between"
            textColor="gray.500"
            fontSize="sm"
            mt="4"
            w="100%"
          >
            <Text>
              <ChakraLink as={RouterLink} to="/update-pwd" color="blue.500">
                Forgot your password?
              </ChakraLink>
            </Text>
          </Box>
        </MyCard>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/home");
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <Prompt
            status="success"
            title="Login Success!"
            description="Redirecting to product list"
          />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;
