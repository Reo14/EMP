import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  Button,
  Text,
  Stack,
  Heading,
  Box,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

const HiringManagementPage: React.FC = () => {
  const [tokenHistory, setTokenHistory] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);

  useEffect(() => {
    // Fetch token history, pending applications, rejected applications, and approved applications
    const fetchData = async () => {
      try {
        const tokenHistoryResponse = await axios.get('/api/token-history');
        setTokenHistory(tokenHistoryResponse.data);

        const pendingApplicationsResponse = await axios.get('/api/pending-applications');
        setPendingApplications(pendingApplicationsResponse.data);

        const rejectedApplicationsResponse = await axios.get('/api/rejected-applications');
        setRejectedApplications(rejectedApplicationsResponse.data);

        const approvedApplicationsResponse = await axios.get('/api/approved-applications');
        setApprovedApplications(approvedApplicationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const generateTokenAndSendEmail = async () => {
    try {
      // Make API call to generate token and send email
      await axios.post('/api/generate-token');
      // Refresh token history after generating a new token
      const updatedTokenHistory = await axios.get('/api/token-history');
      setTokenHistory(updatedTokenHistory.data);
      // Display success message or update UI as needed
      alert('Token generated and email sent successfully!');
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const handleApplicationAction = async (action: string, applicationId: string) => {
    try {
      // Make API call to perform action (approve or reject) on the application
      await axios.put(`/api/${action}-application/${applicationId}`);
      // Refresh application data after the action
      const updatedPendingApplications = await axios.get('/api/pending-applications');
      setPendingApplications(updatedPendingApplications.data);
      // Display success message or update UI as needed
      alert(`Application ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
    } catch (error) {
      console.error(`Error ${action === 'approve' ? 'approving' : 'rejecting'} application:`, error);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" padding="4">
      <Heading mb="4">Hiring Management</Heading>

      <Box mb="4">
        <Button colorScheme="blue" onClick={generateTokenAndSendEmail}>
          Generate Token and Send Email
        </Button>
      </Box>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Pending</Tab>
          <Tab>Rejected</Tab>
          <Tab>Approved</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing="4" width="100%" align="center">
              {pendingApplications.map((application) => (
                <Box key={application.id} borderWidth="1px" p="4" borderRadius="md" width="100%">
                  <Text>
                    <b>Full Name:</b> {`${application.firstName} ${application.lastName}`}
                  </Text>
                  <Text>
                    <b>Email:</b> {application.email}
                  </Text>
                  <Link onClick={() => window.open(`/view-application/${application.id}`, '_blank')}>
                    View Application
                  </Link>
                  <Button
                    colorScheme="green"
                    mt="2"
                    onClick={() => handleApplicationAction('approve', application.id)}
                  >
                    Approve Application
                  </Button>
                  <Button
                    colorScheme="red"
                    mt="2"
                    onClick={() => handleApplicationAction('reject', application.id)}
                  >
                    Reject Application
                  </Button>
                </Box>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing="4" width="100%" align="center">
              {rejectedApplications.map((application) => (
                <Box key={application.id} borderWidth="1px" p="4" borderRadius="md" width="100%">
                  <Text>
                    <b>Full Name:</b> {`${application.firstName} ${application.lastName}`}
                  </Text>
                  <Text>
                    <b>Email:</b> {application.email}
                  </Text>
                  <Link onClick={() => window.open(`/view-application/${application.id}`, '_blank')}>
                    View Application
                  </Link>
                </Box>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing="4" width="100%" align="center">
              {approvedApplications.map((application) => (
                <Box key={application.id} borderWidth="1px" p="4" borderRadius="md" width="100%">
                  <Text>
                    <b>Full Name:</b> {`${application.firstName} ${application.lastName}`}
                  </Text>
                  <Text>
                    <b>Email:</b> {application.email}
                  </Text>
                  <Link onClick={() => window.open(`/view-application/${application.id}`, '_blank')}>
                    View Application
                  </Link>
                </Box>
              ))}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default HiringManagementPage;
