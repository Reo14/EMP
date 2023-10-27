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
import { useFormik } from "formik";
import * as Yup from "yup";
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

  // params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const regToken = queryParams.get("token");
  regToken && localStorage.setItem("regToken", regToken);

  // formik
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email format")
      .required("This field is required"),
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(signUp(values)).unwrap();
        alert("Signed Up Successfully");
        navigate("/employee-onboarding");
      } catch (error) {
        console.log("Sign up error", error);
        alert(error);
        navigate("/error");
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

  const handleClick = () => setShow(!show);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100%">
      <MyCard title="Sign Up an Account">
        <form onSubmit={formik.handleSubmit}>
          <Box mb="5">
            <Text textColor="gray">Email:</Text>
            <Input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              placeholder="Enter your email"
              {...inputStyles}
              borderColor={
                formik.touched.email && formik.errors.email
                  ? "red.500"
                  : "gray.300"
              }
            />
            {formik.touched.email && formik.errors.email && (
              <Text color="red.500" fontSize="sm" float="right">
                {formik.errors.email}
              </Text>
            )}
          </Box>
          <Box mb="5">
            <Text textColor="gray">Username:</Text>
            <Input
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="username"
              placeholder="Enter your username"
              {...inputStyles}
              borderColor={
                formik.touched.username && formik.errors.username
                  ? "red.500"
                  : "gray.300"
              }
            />
            {formik.touched.username && formik.errors.username && (
              <Text color="red.500" fontSize="sm" float="right">
                {formik.errors.username}
              </Text>
            )}
          </Box>
          <Box mb="5">
            <Text textColor="gray">Password:</Text>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                placeholder="Enter your password"
                {...inputStyles}
                borderColor={
                  formik.touched.password && formik.errors.password
                    ? "red.500"
                    : "gray.300"
                }
              />
              <InputRightElement mt="5px" mr="15px">
                <Button color="gray.500" onClick={handleClick}>
                  <Text decoration="underline">{show ? "Hide" : "Show"}</Text>
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && formik.errors.password && (
              <Text color="red.500" fontSize="sm" float="right">
                {formik.errors.password}
              </Text>
            )}
          </Box>
          <Button type="submit" {...buttonStyles} onKeyDown={handleKeyDown}>
            Sign Up
          </Button>
        </form>
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
