import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineCheckCircle, MdBlock } from "react-icons/md";
import toast from "react-hot-toast";
import { Card, Button, Row, Col, Avatar, Badge, Modal } from "antd";

const EmployeeCard = ({ employee, onDetailsClick, onPaymentClick }) => {
  const [salaryData, setSalaryData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isActive, setIsActive] = useState(employee.employee.is_active);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://parkspotter-backened.onrender.com/accounts/salary/")
      .then((response) => response.json())
      .then((data) => {
        const findData = data.find((dt) => dt.employee === employee.employee.id);
        setSalaryData(findData);
        setIsPaid(findData?.is_paid || false);
      });
  }, [employee.employee.id]);

  const handleDetailsClick = () => {
    onDetailsClick({
      ...employee,
      salaryData,
    });
  };

  const handlePaymentClick = () => {
    onPaymentClick(employee, salaryData, setIsPaid);
  };

  const toggleActivationStatus = () => {
    const token = localStorage.getItem("token");
    const url = `https://parkspotter-backened.onrender.com/accounts/user_activation/${employee.employee.id}/${isActive ? "deactivate" : "activate"}/`;

    const requestData = {
      user_type: "employee",
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          setIsActive(!isActive);
          toast.success(`Employee ${isActive ? "deactivated" : "activated"} successfully`);
        } else {
          throw new Error(`Failed to ${isActive ? "deactivate" : "activate"} employee`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error updating employee status");
      });
  };

  return (
    <Card
      style={{ margin: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
      actions={[
        <Button type="primary" onClick={handleDetailsClick}>
          Details
        </Button>,
        <Button type="primary" onClick={handlePaymentClick}>
          Payment
        </Button>,
      ]}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Badge
            count={isPaid ? "Paid" : "Unpaid"}
            style={{ backgroundColor: isPaid ? "green" : "red" }}
          />
        </Col>
        <Col onClick={toggleActivationStatus} style={{ cursor: "pointer" }}>
          {isActive ? (
            <MdOutlineCheckCircle style={{ color: "green", fontSize: "24px" }} />
          ) : (
            <MdBlock style={{ color: "red", fontSize: "24px" }} />
          )}
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Avatar
          size={120}
          src={employee.profile_image}
          alt={`${employee.employee.first_name} ${employee.employee.last_name}`}
        />
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <p><strong>Name:</strong> {employee.employee.first_name} {employee.employee.last_name}</p>
          <p><strong>Mobile No:</strong> {employee.mobile_no}</p>
          <p><strong>Joined Date:</strong> {new Date(employee.joined_date).toLocaleDateString()}</p>
          <p><strong>Salary:</strong> {salaryData?.amount}</p>
        </Col>
        <Col span={12}>
          <p><strong>Last Paid:</strong> {salaryData ? new Date(salaryData.payment_date).toLocaleDateString() : "N/A"}</p>
          <p><strong>Last Paid Amount:</strong> {salaryData ? parseInt(salaryData.adjusted_amount) : "N/A"}</p>
          <p><strong>Address:</strong> {employee.address}</p>
          <p><strong>Login Username:</strong> {employee.employee.username}</p>
        </Col>
      </Row>
      <Modal
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <h2>Employee Details</h2>
      </Modal>
    </Card>
  );
};

export default EmployeeCard;
