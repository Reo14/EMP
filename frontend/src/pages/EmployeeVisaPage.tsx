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
  Input
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';

const OPTReceiptForm: FC = () => {
  return (
    <>
      <Heading as="h3" size="lg" marginBottom="1rem">OPT Receipt</Heading>
      {/* ----- pending ----- */}
      <Alert 
        status='info'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Waiting for HR to approve your OPT Receipt.
        </Box>
      </Alert>

      {/* ----- approve ----- */}
      <Alert 
        status='success'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="row"
            marginBottom="1rem"
          >
            <AlertIcon />
            Please upload a copy of your OPT EAD.
          </Box>
          <FormControl>
            <Input
              type="file"
              accept=".pdf"
              width="60%"
              height="100%"
              bgColor="white"
              marginRight="1rem"
            />
            {/* 丢弃，只需要<Input type="file" />即可
            <Button
              size="sm"
              colorScheme="blue"
            >Upload OPT EAD</Button> */}
          </FormControl>
        </Box>
      </Alert>

      {/* ----- reject ----- */}
      <Alert 
        status='error'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Sorry, your application was rejected.
        </Box>

        <Box>
          <Button
            colorScheme="red"
            size="sm"
            // TODO: show feedback
          >See Feedback</Button>
        </Box>
      </Alert>
    </>
  );
}

const OPTEADForm: FC = () => {
  return (
    <>
      <Heading as="h3" size="lg" marginBottom="1rem">OPT EAD</Heading>
      {/* ----- pending ----- */}
      <Alert 
        status='info'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Waiting for HR to approve your OPT EAD.
        </Box>
      </Alert>

      {/* ----- approve ----- */}
      <Alert 
        status='success'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="row"
            marginBottom="1rem"
          >
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

      {/* ----- reject ----- */}
      <Alert 
        status='error'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Sorry, your application was rejected.
        </Box>

        <Box>
          <Button
            colorScheme="red"
            size="sm"
            // TODO: show feedback
          >See Feedback</Button>
        </Box>
      </Alert>
    </>
  );
}

const I983Form: FC = () => {
  return (
    <>
      <Heading as="h3" size="lg" marginBottom="1rem">I-983</Heading>
      {/* ----- pending ----- */}
      <Alert 
        status='info'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Waiting for HR to approve and sign your I-983.
        </Box>
      </Alert>

      {/* ----- approve ----- */}
      <Alert 
        status='success'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="row"
            marginBottom="1rem"
          >
            <AlertIcon />
            Please send the I-983 along with all necessary documents to your school and upload the new I-20.
          </Box>
          <FormControl>
            <Input
              type="file"
              accept=".pdf"
              width="45%"
              height="100%"
              bgColor="white"
              marginRight="1rem"
            />
            {/* 丢弃 只需要<Input type="file" />即可
            <Button
              size="sm"
              colorScheme="blue"
            >Upload New I-20</Button> */}
          </FormControl>
        </Box>
      </Alert>

      {/* ----- reject ----- */}
      <Alert 
        status='error'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Sorry, your application was rejected.
        </Box>

        <Box>
          <Button
            colorScheme="red"
            size="sm"
            // TODO: show feedback
          >See Feedback</Button>
        </Box>
      </Alert>
    </>
  );
}

const I20Form: FC = () => {
  return (
    <>
      <Heading as="h3" size="lg" marginBottom="1rem">I-20</Heading>
      {/* ----- pending ----- */}
      <Alert 
        status='info'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Waiting for HR to approve your I-20.
        </Box>
      </Alert>

      {/* ----- approve ----- */}
      <Alert 
        status='success'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="row"
            marginBottom="1rem"
          >
            <AlertIcon />
            All documents have been approved.
          </Box>
        </Box>
      </Alert>

      {/* ----- reject ----- */}
      <Alert 
        status='error'
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.75rem 1.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
        >
          <AlertIcon />
          Sorry, your application was rejected.
        </Box>

        <Box>
          <Button
            colorScheme="red"
            size="sm"
            // TODO: show feedback
          >See Feedback</Button>
        </Box>
      </Alert>
    </>
  );
}

const EmployeeVisaPage: FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25);

  return (
    <>
      <Box textAlign="center" py={10} px={6}>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h3" size="lg" mt={6} mb={2}>
          Sorry, this page is only for employee with F1 Visa status.
        </Heading>
        <Button colorScheme="blue" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>

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
      <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
      { 
        step === 1 ? <OPTReceiptForm /> : 
        step === 2 ? <OPTEADForm /> : 
        step === 3 ? <I983Form /> :
        <I20Form />
      }

      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              onClick={() => {
                setStep(step - 1);
                setProgress(progress - 25);
              }}
              isDisabled={step === 1}
              colorScheme="teal"
              variant="solid"
              w="7rem"
              mr="5%"
            >
              Back
            </Button>
            <Button
              w="7rem"
              isDisabled={step === 4}
              onClick={() => {
                setStep(step + 1);
                if (step === 6) {
                  setProgress(100);
                } else {
                  setProgress(progress + 25);
                }
              }}
              colorScheme="teal"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
          {step === 4 ? (
            <Button
              w="7rem"
              colorScheme="red"
              variant="solid"
              // TODO: onClick={() => {}}
            >
              Submit
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>
    </Box>
    </>
  );
};

export default EmployeeVisaPage;