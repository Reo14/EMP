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
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import { signIn } from "../store/reducers/auth";
import Prompt from "../components/Prompt";
import MyCard from "../components/MyCard";
import { AppDispatch } from "../store/configureStore";
import { getOnboardingData } from "../store/reducers/onboarding";

const SignIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // adjusted to use formik values
      try {
        await dispatch(signIn(values)).unwrap();
        const { onBoardStatus } = await dispatch(
          getOnboardingData(values.username)
        ).unwrap();
        alert("Signed In Successfully");
        if (onBoardStatus === "Approved") {
          navigate("/employee-infos");
        } else {
          navigate("/employee-onboarding");
        }
      } catch (error) {
        console.log("login error: ", error);
      }
    },
  });

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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <MyCard title="Welcome">
          <form onSubmit={formik.handleSubmit}>
            <Box mb="5">
              <Text textColor="gray">Username:</Text>
              <Input
                type="text"
                {...formik.getFieldProps("username")}
                placeholder="Enter your username"
                {...inputStyles}
                name="username"
                borderColor={
                  formik.errors.username && formik.touched.username
                    ? "red.500"
                    : "gray.300"
                }
              />
              {formik.errors.username && formik.touched.username && (
                <Text color="red.500" fontSize="sm" float="right">
                  {formik.errors.username}
                </Text>
              )}
            </Box>
            <Box mb="5">
              <Text textColor="gray">Password:</Text>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  placeholder="Enter your password"
                  {...inputStyles}
                  name="password"
                  borderColor={
                    formik.errors.username && formik.touched.username
                      ? "red.500"
                      : "gray.300"
                  }
                />
                <InputRightElement mt="5px" mr="15px">
                  <Button color="gray.500" onClick={handleClick}>
                    <Text decoration="underline">
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.errors.password && formik.touched.password && (
                <Text color="red.500" fontSize="sm" float="right">
                  {formik.errors.password}
                </Text>
              )}
            </Box>
            <Button {...buttonStyles} type="submit" onKeyDown={handleKeyDown}>
              Sign In
            </Button>
          </form>
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
            description="Redirecting to home!"
          />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;
