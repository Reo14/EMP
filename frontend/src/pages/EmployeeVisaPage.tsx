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
  StepStatus,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverArrow,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { stepStatus } from "../types/employee";
import axios from "axios";

type feedbackStatus = "not submitted" | "pending" | "approved" | "rejected";

interface FormProps {
  title: string;
  feedback: feedbackStatus;
  userId: string;
}

const FileForm: FC<FormProps> = ({ title, feedback, userId }) => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
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

  return (
    <>
      <Heading as="h3" size="lg">
        {title}
      </Heading>

      {feedback === "pending" && (
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
      )}

      {feedback === "approved" && (
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
              Please download and fill out the I-983 form.
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button
                size="sm"
                colorScheme="blue"
                // TODO: onClick
              >
                Download Form Here
              </Button>
              <Button
                size="sm"
                colorScheme="blue"
                // TODO: onClick
              >
                Download Sample Here
              </Button>
            </Box>
          </Box>
        </Alert>
      )}

      {feedback === "rejected" && (
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
      )}
      {feedback === "not submitted" && (
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          //...
        />
      )}
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
  const [feedback, setFeedback] = useState<feedbackStatus>("not submitted");
  const [currentStep, setCurrentStep] = useState<stepStatus>("not started");

  const steps: Record<stepStatus, number> = {
    "not started": 0,
    "pending OPT Receipt": 1,
    "pending OPT-EAD": 2,
    "pending I-983": 3,
    "pending I-20": 4,
    "pre-completed": 5,
    completed: 6,
    rejected: -1,
  };

  const step = steps[currentStep];
  // 轮询
  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // 发送请求以获取审批状态
        const res = await axios.get(
          `http://localhost:3000/get-steps/${userId}`
        );

        if (res.status === 200) {
          let curStep: stepStatus;
          let nextStep: stepStatus;
          curStep = res.data.curStep;
          nextStep = res.data.nextStep;
          setCurrentStep(curStep);

          if (nextStep === "rejected") {
            setFeedback("rejected");
          } else {
            if (steps[nextStep] < steps[curStep]) {
              setFeedback("pending");
            } else if (steps[nextStep] === steps[curStep]) {
              setFeedback("not submitted");
            } else {
              setFeedback("approved");
            }
          }
          console.log("step status: ", curStep, " ", nextStep);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    // 开始轮询
    pollRef.current = window.setInterval(fetchStatus, 10000); // 5秒钟请求一次

    // 清除轮询
    return () => {
      if (pollRef.current !== null) {
        clearInterval(pollRef.current);
      }
    };
  }, [userId]); // 依赖于userId，当userId变化时重新开始轮询

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

      {/* ----- document upload */}
      <Box
        borderWidth="1px"
        rounded="md"
        boxShadow="dark-lg"
        bg="white"
        maxWidth={800}
        p={6}
        m="3rem auto"
        as="form"
      >
        {step === 0 ? (
          <FileForm title="OPT Receipt" feedback={feedback} userId={userId} />
        ) : step === 1 ? (
          <FileForm title="OPT EAD" feedback={feedback} userId={userId} />
        ) : step === 2 ? (
          <FileForm title="I-983" feedback={feedback} userId={userId} />
        ) : step === 3 ? (
          <FileForm title="I-20" feedback={feedback} userId={userId} />
        ) : (
          <Box>All files uploaded</Box>
        )}
      </Box>
    </>
  );
};

export default EmployeeVisaPage;
