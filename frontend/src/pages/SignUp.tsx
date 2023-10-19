import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Link as ChakraLink,
    Text,
  } from "@chakra-ui/react";
  import React, { FC, useState, KeyboardEvent, ChangeEvent } from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate, Link as RouterLink } from "react-router-dom";
  import MyCard from "../components/MyCard";
  import { signUp } from "../store/reducers/auth";
  
  const SignUp: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
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
  
    const handleClick = () => setShow(!show);
  
    const onEmailBlur = () => {
      if (!email) {
        setEmailError("This field is required");
      }
    };

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
  
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (!e.target.value) {
        setEmailError("This field is required");
      } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        setEmailError("Invalid Email format");
      } else {
        setEmailError("");
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
  
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSignUp();
      }
    };
  
    const handleSignUp = async () => {
    //   try {
    //     // 其余的注册逻辑保持不变
    //     await dispatch(
    //       signUp({ email, username, password })
    //     ).unwrap();
    //     alert("Signed Up Successfully");
    //     navigate("/all-products");
    //   } catch (error) {
    //     console.error("Error signing up", error.message);
    //   }
    };
  
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <MyCard title="Sign Up an Account">
          <Box mb="5">
            <Text textColor="gray">Email:</Text>
            <Input
              type="email"
              value={email}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              {...inputStyles}
              borderColor={emailError ? "red.500" : "gray.300"}
            />
            {emailError && (
              <Text color="red.500" fontSize="sm" float="right">
                {emailError}
              </Text>
            )}
          </Box>
          <Box mb="5">
            <Text textColor="gray">Username:</Text>
            <Input
              type="text"
              value={username}
              onChange={onUsernameChange}
              onBlur={onUsernameBlur}
              onKeyDown={handleKeyDown}
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
                type={show ? "text" : "password"}
                value={password}
                onChange={onPasswordChange}
                onBlur={onPasswordBlur}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                {...inputStyles}
              />
              <InputRightElement mt="5px" mr="15px">
                <Button color="gray.500" onClick={handleClick}>
                  <Text decoration="underline">{show ? "Hide" : "Show"}</Text>
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordError && (
              <Text color="red.500" fontSize="sm" mt="1" float="right">
                {passwordError}
              </Text>
            )}
          </Box>
          <Button {...buttonStyles} onClick={handleSignUp}>
            Sign Up
          </Button>
  
          <Text color="gray.500">
            Need help or report errors?
            <ChakraLink as={RouterLink} to="/error" color="blue.500">
              {" "}
              Contact your HR!
            </ChakraLink>
          </Text>
        </MyCard>
      </Box>
    );
  };
  
  export default SignUp;
  