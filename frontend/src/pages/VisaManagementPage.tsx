import React, { useState, useEffect } from 'react';
import { Flex, Input, Button, Text, Stack, Heading, Box, Image } from '@chakra-ui/react';
import { EmployeeInfo as Employee } from '../types/employee';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOnboardingStatus } from '../store/reducers/onboarding';

const VisaStatusManagementPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useDispatch();
  const onboardingStatus = useSelector((state: { onboarding: {onboardingState} }) => state.onboarding.onboardingStatus);



  // Fetch employees from the backend API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get<Employee[]>('http://localhost:3000/hr/all-employees');

        const sortedEmployees = response.data.sort((a, b) => a.lastName.localeCompare(b.lastName));

        setEmployees(sortedEmployees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();

    dispatch(getOnboardingStatus(Employee.userId)); 

  }, [dispatch]);

  const calculateRemainingDays = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysRemaining > 0 ? daysRemaining : 0;
  };

  

  const getNextStepsDescription = (employee: Employee) => {
    switch (employee.nextStep) {
      case 'Submit Onboarding Application':
        return 'Next step is to submit onboarding application';
      case 'Rejected':
        return 'Onboarding application was rejected';
      case 'HR Approval':
        return 'Next step is to wait for HR approval';
      case 'Approved':
        return 'Onboarding application is approved';
      default:
        return 'Next steps information not available';
    }
  };


  const handleApproveDocument = async (employee: Employee) => {
    try {
      // Make API call to approve document
      await axios.put(`http://localhost:3000/hr/onboardapplication/process/${employee.userId}`, {
        action: 'approve',
      });

      // Refresh employee data after approval
      const updatedEmployees = await axios.get<Employee[]>('http://localhost:3000/hr/all-employees');
      setEmployees(updatedEmployees.data);
    } catch (error) {
      console.error('Error approving document:', error);
    }
  };

  const handleRejectDocument = async (employee: Employee) => {
    try {
      // Prompt user for feedback
      const feedback = prompt('Provide feedback for document rejection:');

      // Make API call to reject document
      await axios.put(`http://localhost:3000/hr/onboardapplication/process/${employee.userId}`, {
        action: 'reject',
        feedback,
      });

      // Refresh employee data after rejection
      const updatedEmployees = await axios.get<Employee[]>('http://localhost:3000/hr/all-employees');
      setEmployees(updatedEmployees.data);
    } catch (error) {
      console.error('Error rejecting document:', error);
    }
  };

  const handleSendNotification = async (employee: Employee) => {
    // Logic to send notification to the employee
    try {
      // Make API call to send notification to the employee
      await axios.post(`http://localhost:3000/hr/send-notification/${employee.userId}`);
      // 这里需要在后端实现一个发送提醒的函数
      // Display success message or update UI as needed
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" padding="4">
      <Heading mb="4">Visa Status Management</Heading>

      <Input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb="4"
      />

      <Stack spacing="4" width="100%" align="center">
        {filteredEmployees.map((employee) => (
          <Box key={employee.userId} borderWidth="1px" p="4" borderRadius="md" width="100%">
            <Text fontWeight="bold">{`${employee.firstName} ${employee.lastName}`}</Text>
            <Text>
                <b>Title:</b> {employee.employment?.visaTitle || 'Not specified'}
            </Text>
            <Text>
              <b>Start Date:</b> {employee.employment?.startDate ? new Date(employee.employment.startDate).toLocaleDateString() : 'Not specified'}
            </Text>
            <Text>
              <b>End Date:</b> {employee.employment?.endDate ? new Date(employee.employment.endDate).toLocaleDateString() : 'Not specified'}
            </Text>
            <Text>
              <b>Number of Days Remaining:</b> {employee.employment?.endDate ? calculateRemainingDays(new Date(employee.employment.endDate).toLocaleDateString()) : 'Not specified'}
            </Text>

            <Text mt="2">
                <b>Next Steps:</b> {getNextStepsDescription(employee)}
            </Text>

            {employee.nextStep === 'HR Approval' && (
            <>
                {/* Display documents for HR approval */}
                {employee.documents?.map((document, index) => (
                <div key={index}>
                    <Text>
                    <b>Document Type:</b> {document.type}
                    </Text>
                    <Image src={document.file} alt={`Document Preview ${index}`} width="200px" height="auto" />
                </div>
                ))}
                <Button colorScheme="green" mt="2" onClick={() => handleApproveDocument(employee)}>
                Approve Document
                </Button>
                <Button colorScheme="red" mt="2" onClick={() => handleRejectDocument(employee)}>
                Reject Document
                </Button>
            </>
            )}

            {employee.nextStep === 'Send Notification' && (
              <Button colorScheme="blue" mt="2" onClick={() => handleSendNotification(employee)}>
                Send Notification
              </Button>
            )}
          </Box>
        ))}
      </Stack>
    </Flex>
  );
};

export default VisaStatusManagementPage;

