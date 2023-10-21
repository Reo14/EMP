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
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  Link as RouterLink,
  useParams,
  useLocation,
} from "react-router-dom";
import MyCard from "../components/MyCard";
import { signUp, queryInfo, queryData } from "../store/reducers/auth";
import { RootState, AppDispatch } from "../store/configureStore";

const SignUp: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const regToken = queryParams.get("token");
  regToken && localStorage.setItem("token", regToken);

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

  const onEmailBlur = async () => {
    if (!email) {
      setEmailError("This field is required");
      return;
    }
    try {
      const { exists: queryRes } = await dispatch(
        queryInfo({ type: "email", value: email })
      ).unwrap();
      if (queryRes === true) {
        setEmailError("Email already exists");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.log("Got an error", error);
    }
  };

  const onUsernameBlur = async () => {
    if (!username) {
      setUsernameError("This field is required");
    }
    try {
      const { exists: queryRes } = await dispatch(
        queryInfo({ type: "username", value: username })
      ).unwrap();
      if (queryRes === true) {
        setUsernameError("Username already exists");
      } else {
        setUsernameError("");
      }
    } catch (error) {
      console.log("Got an error", error);
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
    if (!username) {
      setUsernameError("This field is required");
      return;
    }
    if (!password) {
      setPasswordError("This field is required");
      return;
    }
    if (!email) {
      setEmailError("This field is required");
      return;
    }
    dispatch(signUp({ email, username, password }));
    alert("Signed Up Successfully");
    navigate("/success");
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
