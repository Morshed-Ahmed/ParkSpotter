import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const PrimaryColor = "#202123";
const SecondaryColor = "#ffffff";

const Card = styled.div`
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
  width: calc(33% - 40px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.39);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    flex: 40%;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #202123;
  margin-bottom: 15px;
`;

const EmployeeDetail = styled.p`
  margin: 5px 0;
  font-size: 16px;

  strong {
    color: gray;
  }
`;

const DetailsButton = styled.button`
  padding: 6px 14px;
  font-size: 16px;
  color: #ffffff;
  ${"" /* background-color: #218838; */}
  color:black;
  border: 1px solid #218838;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #218838;
    color: white;
    transform: scale(1.05);
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
  visibility: ${(props) => (props.isModalOpen ? "visible" : "hidden")};
`;

const ModalContent = styled.div`
  background-color: ${SecondaryColor};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 800px;
  position: relative;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(${(props) => (props.isModalOpen ? "0" : "-50px")});
  opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${PrimaryColor};
`;

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <ModalBackground isModalOpen={isOpen} onClick={onClose}>
      <ModalContent isModalOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircleOutline size={"30"} />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

const EmployeeCard = ({ employee, onDetailsClick, onPaymentClick }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://parkspotter-backened.onrender.com/accounts/salary/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setSalaryData(data)
        const findData = data.find(
          (dt) => dt?.employee == employee?.employee?.id
        );
        setSalaryData(findData);
        setIsPaid(findData?.is_paid || false);
      });
  }, [employee.id]);

  const handleDetailsClick = () => {
    onDetailsClick(employee, salaryData);
  };
  const handlePaymentClick = () => {
    onPaymentClick(employee, salaryData, setIsPaid);
  };
  return (
    <Card>
      <button
        style={{
          border: "1px solid #218838",
          padding: "5px",
          borderRadius: "10px",
          fontSize: "12px",
        }}
      >
        {salaryData?.is_paid ? <>Paid</> : <>Payment Due</>}
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ProfileImage
          src={employee?.profile_image}
          alt={`${employee?.first_name}${employee?.last_name}`}
        />
      </div>
      <EmployeeDetail>
        <strong>Name:</strong> {employee?.employee?.first_name}{" "}
        {employee?.employee?.last_name}
      </EmployeeDetail>
      <EmployeeDetail>
        <strong>Mobile No:</strong> {employee?.mobile_no}{" "}
      </EmployeeDetail>
      <EmployeeDetail>
        <strong>Joined Date:</strong>
        {new Date(employee?.joined_date).toLocaleDateString()}{" "}
      </EmployeeDetail>
      <EmployeeDetail>
        <strong>Salary:</strong> {salaryData?.amount}
      </EmployeeDetail>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DetailsButton onClick={handleDetailsClick}>Details</DetailsButton>
        <DetailsButton onClick={handlePaymentClick}>Payment</DetailsButton>
      </div>
      {/* <div>
        <CustomModal isOpen={modalOpen} onClose={closeModal}>
          <h1>hello</h1>
        </CustomModal>
      </div> */}
    </Card>
  );
};

export default EmployeeCard;
