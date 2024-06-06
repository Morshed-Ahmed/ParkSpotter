import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal, Row, Col, Typography, Divider, Tag } from "antd";
import { CloseButton, ModalContent, EmployeeDetail } from "./EmployeeDetailsModal.styled";

const { Title, Text } = Typography;

const EmployeeDetailsModal = ({ isOpen, onClose, employeeData }) => {
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    if (isOpen && employeeData) {
      fetch(`https://parkspotter-backened.onrender.com/accounts/bookings/?employee=${employeeData.employee.id}`)
        .then((response) => response.json())
        .then((data) => {
          // Calculate number of bookings and total revenue
          const totalBookings = data.length;
          const totalRevenue = data.reduce((acc, booking) => acc + booking.total_amount, 0);
          setBookingInfo({ totalBookings, totalRevenue });
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [isOpen, employeeData]);

  if (!employeeData) {
    return null;
  }

  const { employee, mobile_no, qualification, nid_card_no, address, joined_date, salaryData } = employeeData;

  return (
    <Modal
      title="Employee Information"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      closeIcon={<IoIosCloseCircleOutline size={"30"} />}
    >
      <ModalContent>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <EmployeeDetail>
              <Title level={5}>Name:</Title> 
              <Text>{employee.first_name} {employee.last_name}</Text>
            </EmployeeDetail>
            <EmployeeDetail>
              <Title level={5}>Username:</Title> 
              <Text>{employee.username}</Text>
            </EmployeeDetail>
            <EmployeeDetail>
              <Title level={5}>Mobile No:</Title> 
              <Text>{mobile_no}</Text>
            </EmployeeDetail>
            <EmployeeDetail>
              <Title level={5}>Qualification:</Title> 
              <Text>{qualification}</Text>
            </EmployeeDetail>
          </Col>
          <Col span={12}>
            <EmployeeDetail>
              <Title level={5}>NID Card Number:</Title> 
              <Text>{nid_card_no}</Text>
            </EmployeeDetail>
            <EmployeeDetail>
              <Title level={5}>Address:</Title> 
              <Text>{address}</Text>
            </EmployeeDetail>
            <EmployeeDetail>
              <Title level={5}>Joined Date:</Title> 
              <Text>{new Date(joined_date).toLocaleDateString()}</Text>
            </EmployeeDetail>
          </Col>
        </Row>
        {salaryData && (
          <>
            <Divider />
            <Title level={4} style={{ marginBottom: '20px' }}>Salary Information</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <EmployeeDetail>
                  <Title level={5}>Amount:</Title> 
                  <Tag color="blue">{salaryData.amount}</Tag>
                </EmployeeDetail>
                <EmployeeDetail>
                  <Title level={5}>Is Paid:</Title> 
                  <Tag color={salaryData.is_paid ? "green" : "red"}>{salaryData.is_paid ? "Yes" : "No"}</Tag>
                </EmployeeDetail>
                <EmployeeDetail>
                  <Title level={5}>Payment Date:</Title> 
                  <Text>{new Date(salaryData.payment_date).toLocaleDateString()}</Text>
                </EmployeeDetail>
              </Col>
              <Col span={12}>
                <EmployeeDetail>
                  <Title level={5}>Effective From:</Title> 
                  <Text>{salaryData.effective_from}</Text>
                </EmployeeDetail>
                <EmployeeDetail>
                  <Title level={5}>Effective To:</Title> 
                  <Text>{salaryData.effective_to}</Text>
                </EmployeeDetail>
                <EmployeeDetail>
                  <Title level={5}>Adjusted Amount:</Title> 
                  <Tag color="blue">{salaryData.adjusted_amount}</Tag>
                </EmployeeDetail>
              </Col>
            </Row>
          </>
        )}
        {bookingInfo && (
          <>
            <Divider />
            <Title level={4}>Booking Information</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <EmployeeDetail>
                  <Title level={5}>Number of Bookings:</Title> 
                  <Text>{bookingInfo.totalBookings}</Text>
                </EmployeeDetail>
              </Col>
              <Col span={12}>
                <EmployeeDetail>
                  <Title level={5}>Total Revenue:</Title> 
                  <Tag color="blue">${bookingInfo.totalRevenue.toFixed(2)}</Tag>
                </EmployeeDetail>
              </Col>
            </Row>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EmployeeDetailsModal;
