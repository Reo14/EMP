import { FC, useState } from "react";
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
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { stepStatus } from "../types/employee";

type feedbackStatus = "not submitted" | "pending" | "approved" | "rejected";


interface FormProps {
  title: string;
  feedback: feedbackStatus;
}

const FileForm: FC<FormProps> = ({ title, feedback }) => {
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/your/upload/endpoint", {
        method: "POST",
        body: formData,
      });
      // Handle success/failure based on response
    } catch (error) {
      console.error("Error uploading file:", error);
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
            Waiting for HR to approve your OPT EAD.
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
            <Button
              colorScheme="red"
              size="sm"
              // TODO: show feedback
            >
              See Feedback
            </Button>
          </Box>
        </Alert>
      )}
      {feedback === "not submitted" && (
        <Input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          //...
        />
      )}
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

  const isPerm = useSelector<RootState, string>(
    (state) => state.onboarding.data.isPermanentResident
  );
  const currentStep = useSelector<RootState, stepStatus>(
    (state) => state.onboarding.data.currentStep || "not started"
  );
  const nextStep = useSelector<RootState, stepStatus>(
    (state) => state.onboarding.data.nextStep || "not started"
  );
  const reason = useSelector<RootState, string>(
    (state) => state.onboarding.data.visaFeedback || ""
  );

  const steps: Record<stepStatus, number> = {
    "not started": 0,
    "pending OPT Receipt": 1,
    "pending OPT-EAD": 2,
    "pending I-983": 3,
    "pending I-20": 4,
    completed: 5,
    rejected: -1,
  };

  const step = steps[currentStep];
  const feedback = nextStep === "rejected" ? nextStep : "not submitted";

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
          <FileForm title="OPT Receipt" feedback={feedback} />
        ) : step === 1 ? (
          <FileForm title="OPT-EAD" feedback={feedback} />
        ) : step === 2 ? (
          <FileForm title="I-983" feedback={feedback} />
        ) : step === 3 ? (
          <FileForm title="I-20" feedback={feedback} />
        ) : (
          <Box>All files uploaded</Box>
        )}

        <Flex mt="5" w="100%" justifyContent="center">
          <Button
            w="7rem"
            colorScheme="red"
            variant="solid"
            // TODO: onClick={() => {}}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default EmployeeVisaPage;
