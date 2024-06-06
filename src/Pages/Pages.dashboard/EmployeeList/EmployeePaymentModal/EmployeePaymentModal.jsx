import { IoIosCloseCircleOutline } from "react-icons/io";
import { CloseButton, ModalBackground, ModalContent } from "./EmployeePaymentModal.styled";

const EmployeePaymentModal = ({ isOpen, onClose, children }) => {
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

export default EmployeePaymentModal;
// original