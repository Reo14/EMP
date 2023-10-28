// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Center,
  Input,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { EmployeeInfo as Employee } from "../types/employee";
import {useNavigate, Link as RouterLink } from 'react-router-dom'; // Import Link from React Router

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data from your backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get<Employee[]>('http://localhost:3000/hr/all-employees'); 

        // Order employees alphabetically by last name
        const sortedEmployees = response.data.sort((a, b) => a.lastName.localeCompare(b.lastName));

        setEmployees(sortedEmployees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        alert(error);
        navigate('/error')
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const firstName = employee?.firstName || '';
    const lastName = employee?.lastName || '';
    const email = employee?.email || '';

    return (
      firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Box p={8}>
      <Input
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
        bgColor="white"
      />
      <Center
        bgColor="white"
        borderRadius="5px"
      >
        <Table variant="striped" colorScheme='blackAlpha'>
          <Thead>
            <Tr>
              <Th>Name (legal full name)</Th>
              <Th>Email</Th>
              <Th>SSN</Th>
              <Th>Work Authorization Title</Th>
              <Th>Phone Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEmployees.map((employee) => (
              <Tr key={employee.userId} _hover={{ textDecor: "none", backgroundColor: "blue.50" }}>
                <Td>
                  <Link
                    as={RouterLink} // Use RouterLink from React Router
                    to={`/hr/review-info?userId=${employee.userId}`} // Adjust the route parameter
                    target="_blank"
                  >
                    {`${employee.firstName} ${employee.lastName}`}
                  </Link>
                </Td>
                <Td>{employee.email}</Td>
                <Td>{employee.SSN}</Td>
                <Td>{employee.employment?.visaTitle}</Td> 
                <Td>{employee.Contact.cellPhoneNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
    </Box>
  );
};

export default EmployeeList;

