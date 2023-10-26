import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Button,
  Text,
  Stack,
  Heading,
  Box,
  Link,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface RegistrationToken {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  registrationLink: string;
  status: string;
  onboardStatus: string; // ["Never submitted", "Rejected", "Pending", "Approved"],
}

const HiringManagementPage: React.FC = () => {
  const [registrationTokenHistory, setRegistrationTokenHistory] = useState<
    RegistrationToken[]
  >([]);
  const [expandedToken, setExpandedToken] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registrationTokenHistoryResponse = await axios.get<{
          data: RegistrationToken[];
        }>("http://localhost:3000/hr/registration/history");
        setRegistrationTokenHistory(registrationTokenHistoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigateToHRTest = () => {
    navigate("/hrtest");
  };

  const toggleExpand = (email: string) => {
    setExpandedToken(expandedToken === email ? null : email);
  };

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterStatus(event.target.value);
  };

  const handleViewApplication = (userId: string) => {
    navigate(`/hr/review-info?from=hiring&userId=${userId}`);
  };

  // const handleApprove = (email: string) => {
  //   // Implement logic to send approval to the server
  //   // For example, send a PUT request to update the onboardStatus
  // };

  // const handleReject = async (email: string) => {
  //   // Implement logic to send rejection to the server
  //   // For example, send a PUT request to update the onboardStatus
  //   const feedback = prompt('Enter feedback for rejection:');
  //   if (feedback !== null) {
  //     // Send feedback to the server
  //     await axios.put(`http://localhost:3000/hr/reject-application/${email}`, {
  //       feedback: feedback,
  //     });
  //   }
  // };

  const filteredData = filterStatus
    ? registrationTokenHistory.filter(
        (token) => token.onboardStatus === filterStatus
      )
    : registrationTokenHistory;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      padding="4"
    >
      <Heading mb="4">Hiring Management</Heading>

      <Box mb="4">
        <Button colorScheme="blue" onClick={navigateToHRTest}>
          Generate Token and Send Email
        </Button>
      </Box>

      <Box mb="4" alignSelf="flex-end">
        <Select
          placeholder="Filter by Onboard Status"
          onChange={handleStatusFilterChange}
        >
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Approved">Approved</option>
        </Select>
      </Box>

      <Stack spacing="4" width="100%" align="center">
        {filteredData?.length ? (
          filteredData.map((token) => (
            <Box
              key={token.email}
              borderWidth="1px"
              p="4"
              borderRadius="md"
              width="100%"
            >
              <Text>
                <b>Email:</b> {token.email}
              </Text>
              <Text>
                <b>Name:</b> {token.firstName} {token.lastName}
              </Text>
              <Text>
                <b>Status:</b> {token.status}
              </Text>

              <Button
                colorScheme={token.status === "Submitted" ? "green" : "red"}
                onClick={() => toggleExpand(token.email)}
              >
                {expandedToken === token.email
                  ? "Hide Link"
                  : `Show ${token.status} Link`}
              </Button>

              <Text>
                <b>Onboard Status:</b> {token.onboardStatus}
              </Text>
              {expandedToken === token.email && (
                <Text>
                  <b>Registration Link:</b>{" "}
                  <Link color={token.status === "Submitted" ? "green" : "red"}>
                    {token.registrationLink}
                  </Link>
                </Text>
              )}
              {token.onboardStatus === "Pending" &&
                filterStatus == "Pending" && (
                  <>
                    <Button
                      colorScheme="yellow"
                      onClick={() => handleViewApplication(token.userId)}
                    >
                      View Application
                    </Button>
                    {/* <Button colorScheme="green" onClick={() => handleApprove(token.email)}>
                    Approve
                  </Button>
                  <Button colorScheme="red" onClick={() => handleReject(token.email)}>
                    Reject
                  </Button> */}
                  </>
                )}
            </Box>
          ))
        ) : (
          <Text>No registration history available.</Text>
        )}
      </Stack>
    </Flex>
  );
};

export default HiringManagementPage;
