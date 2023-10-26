import {
  Box,
  Button,
  Textarea,
  Flex,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

const MyWidget = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="fixed"
      right="10%"
      top="50%"
      transform="translateY(-50%)"
      zIndex="sticky"
      boxShadow="md"
      borderRadius="md"
      p={4}
      bg="white"
    >
      <VStack spacing={4}>
        <Button
          colorScheme="green"
          borderRadius="md"
          _hover={{ bgGradient: "linear(to-r, green.400, green.500)" }}
          _active={{ bgGradient: "linear(to-r, green.500, green.600)" }}
          onClick={() => {
            // handle approve logic
            console.log("Approved");
            onClose();
          }}
        >
          Approve
        </Button>

        <Button
          borderRadius="md"
          colorScheme="red"
          _hover={{ bgGradient: "linear(to-r, red.400, red.500)" }}
          _active={{ bgGradient: "linear(to-r, red.500, red.600)" }}
          onClick={onOpen}
        >
          Reject
        </Button>

        {isOpen && (
          <Textarea
            placeholder="Enter rejection message..."
            size="sm"
            mb={2}
            borderRadius="md"
            boxShadow="inner"
          />
        )}

        {isOpen && (
          <Button
            borderRadius="md"
            colorScheme="red"
            _hover={{ bgGradient: "linear(to-r, red.400, red.500)" }}
            _active={{ bgGradient: "linear(to-r, red.500, red.600)" }}
            onClick={() => {
              // handle reject logic with message
              console.log("Rejected with message");
              onClose();
            }}
          >
            Submit Rejection
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default MyWidget;
