import React, { useEffect, useState } from 'react';
import { Table, Tag, Input, Modal, Button, Spin, Alert } from 'antd';
import axios from 'axios';
import styled from 'styled-components';

const { Search } = Input;

// Styled component for the container
const Container = styled.div`
  padding: 20px;
`;

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Alert message="Something went wrong" type="error" />;
    }

    return this.props.children; 
  }
}

const Salary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const salaryResponse = await axios.get('https://parkspotter-backened.onrender.com/accounts/salary/');
        setSalaryData(salaryResponse.data);
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    };

    const fetchEmployeeData = async () => {
      try {
        const employeeResponse = await axios.get('https://parkspotter-backened.onrender.com/accounts/employee-list/');
        setEmployeeData(employeeResponse.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    const fetchData = async () => {
      await fetchSalaryData();
      await fetchEmployeeData();
      setLoading(false);
    };

    fetchData();
  }, []);

  const getEmployeeDetails = (employeeId) => {
    return employeeData.find(employee => employee.employee.id === employeeId)?.employee || {};
  };

  const combinedData = salaryData.map(salary => {
    const employeeDetails = getEmployeeDetails(salary.employee);
    return {
      ...salary,
      first_name: employeeDetails.first_name,
      last_name: employeeDetails.last_name,
      username: employeeDetails.username,
    };
  });

  const filteredData = combinedData.filter(item =>
    `${item.first_name} ${item.last_name}`.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (record) => {
    setModalContent(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          {record.first_name} {record.last_name}
        </Button>
      ),
      filters: [...new Set(combinedData.map(item => `${item.first_name} ${item.last_name}`))].map(name => ({ text: name, value: name })),
      onFilter: (value, record) => `${record.first_name} ${record.last_name}` === value,
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
    },
    {
      title: 'Is Paid',
      dataIndex: 'is_paid',
      key: 'is_paid',
      render: isPaid => <Tag color={isPaid ? 'green' : 'volcano'}>{isPaid ? 'Yes' : 'No'}</Tag>,
      filters: [
        { text: 'Paid', value: true },
        { text: 'Unpaid', value: false },
      ],
      onFilter: (value, record) => record.is_paid === value,
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      sorter: (a, b) => new Date(a.payment_date) - new Date(b.payment_date),
    },
    {
      title: 'Effective From',
      dataIndex: 'effective_from',
      key: 'effective_from',
      sorter: (a, b) => new Date(a.effective_from) - new Date(b.effective_from),
    },
    {
      title: 'Effective To',
      dataIndex: 'effective_to',
      key: 'effective_to',
      sorter: (a, b) => new Date(a.effective_to) - new Date(b.effective_to),
    },
    {
      title: 'Adjusted Amount',
      dataIndex: 'adjusted_amount',
      key: 'adjusted_amount',
      sorter: (a, b) => parseFloat(a.adjusted_amount) - parseFloat(b.adjusted_amount),
    },
  ];

  return (
    <ErrorBoundary>
      <Container>
        <Search
          placeholder="Search employees"
          onChange={e => setSearchText(e.target.value)}
          style={{ marginBottom: 20, width: 300 }}
        />
        {loading ? (
          <Spin tip="Loading..." size="large">
            <div style={{ height: '300px' }} />
          </Spin>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
        <Modal title="Salary Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p><strong>Employee:</strong> {modalContent.first_name} {modalContent.last_name}</p>
          <p><strong>Amount:</strong> {modalContent.amount}</p>
          <p><strong>Is Paid:</strong> {modalContent.is_paid ? 'Yes' : 'No'}</p>
          <p><strong>Payment Date:</strong> {modalContent.payment_date}</p>
          <p><strong>Effective From:</strong> {modalContent.effective_from}</p>
          <p><strong>Effective To:</strong> {modalContent.effective_to}</p>
          <p><strong>Adjusted Amount:</strong> {modalContent.adjusted_amount}</p>
        </Modal>
      </Container>
    </ErrorBoundary>
  );
};

export default Salary;
