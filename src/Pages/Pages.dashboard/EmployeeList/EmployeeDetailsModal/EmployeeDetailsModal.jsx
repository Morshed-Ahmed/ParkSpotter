import { IoIosCloseCircleOutline } from "react-icons/io";
import { CloseButton, ModalBackground, ModalContent } from "./EmployeeDetailsModal.styled";

const EmployeeDetailsModal = ({ isOpen, onClose, employeeData }) => {
  if (!employeeData) {
    return null;
  }

  const { employee, mobile_no, qualification, nid_card_no, address, joined_date, salaryData } = employeeData;

  return (
    <ModalBackground isModalOpen={isOpen} onClick={onClose}>
      <ModalContent isModalOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircleOutline size={"30"} />
        </CloseButton>
        <h1 style={{ textAlign: "center" }}>Employee Information</h1>
        <div>
          <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
          <p><strong>Username:</strong> {employee.username}</p>
          <p><strong>Mobile No:</strong> {mobile_no}</p>
          <p><strong>Qualification:</strong> {qualification}</p>
          <p><strong>NID Card Number:</strong> {nid_card_no}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Joined Date:</strong> {new Date(joined_date).toLocaleDateString()}</p>
        </div>
        {salaryData && (
          <div>
            <h2>Salary Information</h2>
            <p><strong>Amount:</strong> {salaryData.amount}</p>
            <p><strong>Is Paid:</strong> {salaryData.is_paid ? "Yes" : "No"}</p>
            <p><strong>Payment Date:</strong> {new Date(salaryData.payment_date).toLocaleDateString()}</p>
            <p><strong>Effective From:</strong> {salaryData.effective_from}</p>
            <p><strong>Effective To:</strong> {salaryData.effective_to}</p>
            <p><strong>Adjusted Amount:</strong> {salaryData.adjusted_amount}</p>
          </div>
        )}
      </ModalContent>
    </ModalBackground>
  );
};

export default EmployeeDetailsModal;
