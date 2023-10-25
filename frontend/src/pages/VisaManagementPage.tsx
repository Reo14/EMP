import React, { useState, useEffect } from 'react';
import { Flex, Input, Button, Text, Stack, Heading, Box, Image } from '@chakra-ui/react';
import { EmployeeInfo as Employee } from '../types/employee';
import axios from 'axios';

const VisaStatusManagementPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
 
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
  }, []);

  const calculateRemainingDays = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };


  const handleApproveDocument = async (employee: Employee) => {
    try {
      await axios.put(`http://localhost:3000/hr/onboardapplication/process/${employee.userId}`, {
        action: 'approve',
      });

      const updatedEmployees = await axios.get<Employee[]>('http://localhost:3000/hr/all-employees');
      setEmployees(updatedEmployees.data);
    } catch (error) {
      console.error('Error approving document:', error);
    }
  };

  const handleRejectDocument = async (employee: Employee) => {
    try {
      const feedback = prompt('Provide feedback for document rejection:');

      await axios.put(`http://localhost:3000/hr/onboardapplication/process/${employee.userId}`, {
        action: 'reject',
        feedback,
      });

      const updatedEmployees = await axios.get<Employee[]>('http://localhost:3000/hr/all-employees');
      setEmployees(updatedEmployees.data);
    } catch (error) {
      console.error('Error rejecting document:', error);
    }
  };

  const handleSendNotification = async (employee: Employee) => {
    try {
      await axios.post(`http://localhost:3000/hr/send-notification/${employee.userId}`);
      // 目前后端还没有这个api
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    // 这里还需要添加一个逻辑 fliter掉位于状态13的employees
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

            {/* <Text mt="2">
              <b>Next Steps:</b> {employee.onboardStatus || 'Not specified'}
            </Text> 
            这里的状态顺序分别为：
            1. HR发送了registration token
            2. submit onboarding application/ submit OPT receipt 这俩是一个意思
            3. HR approval 显示下面这段话 / Rejected 显示feedback
            Please Uplpad OPT EAD

            4. Submit OPT EAD
            5 Waiting for HR to approve OPT EAD
            6. HR approval 显示下面这段话 / Rejected 显示feedback
            download and fill out the I-983 form

            7. Upload I-983
            8. Waiting for HR to approve and sign your I-983 
            9. HR Approval 显示下面这段话 / Rejected 显示feedback
            Please send the I-983 along with all necessary documents to your school and upload the new I-20

            10. Upload new I20
            11. Waiting for HR to approve your I-20
            12. HR Approval 显示下面这段话 / Rejected 显示feedback
            All documents have been approved

            13. All done 需要被filter掉
            */}

            {/* {employee.nextStep 此处需改为对应的状态编号 === 'HR Approval' && (
              <>
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
            )} */}

            {/* {employee.nextStep === 'Send Notification' && (
              <Button colorScheme="blue" mt="2" onClick={() => handleSendNotification(employee)}>
                Send Notification
              </Button>
            )} */}
          </Box>
        ))}
      </Stack>
    </Flex>
  );
};

export default VisaStatusManagementPage;
