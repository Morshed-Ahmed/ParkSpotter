import styled from 'styled-components';
import { Button, Card as AntCard, Modal } from 'antd';

export const PrimaryColor = '#1d1d1f'; // Apple's dark gray color
export const SecondaryColor = '#ffffff'; // White color

export const StyledCard = styled(AntCard)`
  border-radius: 16px;
  padding: 24px;
  margin: 20px;
  width: calc(33% - 40px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    background-color: #f7f7f9; // Light grey for hover effect
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 768px) and (max-width: 992px) {
    flex: 40%;
  }
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${PrimaryColor};
  margin-bottom: 20px;
`;

export const EmployeeDetail = styled.p`
  margin: 8px 0;
  font-size: 16px;
  color: ${PrimaryColor};

  strong {
    color: ${PrimaryColor};
  }
`;

export const StyledButton = styled(Button)`
  padding: 8px 16px;
  font-size: 16px;
  color: ${SecondaryColor};
  background-color: #0071e3; // Apple's blue color
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${SecondaryColor};
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 80%;
    max-width: 600px;
  }
  .ant-modal-close {
    color: ${PrimaryColor};
    font-size: 24px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${PrimaryColor};
`;

export const StatusLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  background-color: ${(props) => (props.isPaid ? "green" : "red")};
  color: white;
  border-radius: 4px;
  font-weight: bold;
`;

export const ActiveStatus = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${(props) => (props.isActive ? "green" : "red")};
  font-size: 24px;
  cursor: pointer;
`;
