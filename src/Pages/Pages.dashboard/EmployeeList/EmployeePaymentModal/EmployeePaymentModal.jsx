import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal } from "antd";
import { ModalContent } from "./EmployeePaymentModal.styled";

const EmployeePaymentModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      title="Payment Information"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      closeIcon={<IoIosCloseCircleOutline size={"30"} />}
    >
      <ModalContent>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default EmployeePaymentModal;
