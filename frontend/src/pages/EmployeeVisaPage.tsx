import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Box,
  Button,
  Progress,
  ButtonGroup,
  Flex,
  Alert,
  AlertIcon,
  FormControl,
  Input,
  Text,
  StepStatus,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverArrow,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  VStack,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import axios from "axios";

interface FormProps {
  title: string;
  userId: string;
}

const FileForm: FC<FormProps> = ({ title, userId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isCurrent, setIsCurrent] = useState<boolean>(false);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const checkFile = async (type: string, userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/get-file-status/${type}/${userId}`
      );
      const isUploaded = response.data.uploaded;
      setUploaded(isUploaded);
      setIsCurrent(response.data.isCurrent);
      if (isUploaded) {
        setStatus(response.data.status);
        setFeedback(response.data.feedback);
      }

      return response.data;
    } catch (error) {
      console.log("Error ----", error);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("type", title);
    formData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:3000/optdocument/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("上传文件时出错:", error);
    }
  };

  useEffect(() => {
    checkFile(title, userId);
  }, []);

  useEffect(() => {
    const poll = setInterval(() => checkFile(title, userId), 10000);
    return () => clearInterval(poll);
  }, [status, title, userId]);

  return (
    <>
      <Heading as="h3" size="lg">
        {title}
      </Heading>
      {!uploaded && isCurrent && (
        <>
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            //...
          />

          <Flex mt="5" w="100%" justifyContent="center">
            <Button
              w="7rem"
              colorScheme="red"
              variant="solid"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Flex>
        </>
      )}
      {!uploaded && !isCurrent && (
        <Text>Please completed previous steps first</Text>
      )}
      {uploaded &&
        (status === "Pending" ? (
          <Alert
            status="info"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding="0.75rem 1.5rem"
          >
            <Box display="flex" flexDirection="row">
              <AlertIcon />
              Waiting for HR to approve your {title}.
            </Box>
          </Alert>
        ) : status === "Approved" ? (
          <Alert
            status="success"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding="0.75rem 1.5rem"
          >
            <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row" marginBottom="1rem">
                <AlertIcon />
                File has been approved. Please continue
              </Box>
            </Box>
          </Alert>
        ) : (
          <Alert
            status="error"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding="0.75rem 1.5rem"
          >
            <Box display="flex" flexDirection="row">
              <AlertIcon />
              Sorry, your application was rejected.
            </Box>

            <Box>
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="red" size="sm">
                    See Feedback
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Feedback from your HR</PopoverHeader>
                    <PopoverBody>
                      {feedback ? feedback : "No feedback provided"}
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Box>
          </Alert>
        ))}
    </>
  );
};

const EmployeeVisaPage: FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.auth.isLoggedIn
  );
  if (!isLoggedIn) {
    navigate("/error");
    return;
  }

  const userId = useSelector<RootState, string>((state) => state.auth.userId);
  const isPerm = useSelector<RootState, string>(
    (state) => state.onboarding.data.isPermanentResident
  );

  return (
    <>
      {isPerm === "Yes" && (
        <Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={"50px"} color={"blue.500"} />
          <Heading as="h3" size="lg" mt={6} mb={2}>
            Sorry, this page is only for employee with F1 Visa status.
          </Heading>
          <Button colorScheme="blue" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      )}

      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <VStack spacing={3}>
          <FileForm title="OPT Receipt" userId={userId} />
          <FileForm title="OPT EAD" userId={userId} />
          <FileForm title="I-983" userId={userId} />
          <FileForm title="I-20" userId={userId} />
        </VStack>
      </Box>
    </>
  );
};

export default EmployeeVisaPage;
