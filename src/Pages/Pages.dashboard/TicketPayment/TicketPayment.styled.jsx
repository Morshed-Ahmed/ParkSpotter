import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
  color: #202123;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 50px;
  border-radius: 7px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.39);
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const RefreshButton = styled.button`
  padding: 6px 10px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 99px;
  font-size: 12px;
  cursor: pointer;
  margin-left: auto;
  margin-top: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PaidStatus = styled.span`
  color: ${(props) => (props.paid ? "green" : "red")};
  font-weight: bold;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const TicketContainer = styled.div`
  background: #ffffff;
  color: #333;
  padding: 20px;
  border-radius: 15px;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const TicketNumber = styled.h2`
  color: #007bff;
  margin: 0;
  font-size: 1.5em;
`;

export const DetailSection = styled.div`
  margin-bottom: 15px;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

export const DetailValue = styled.span`
  color: #666;
`;

export const FineAlert = styled.div`
  background: #ffdddd;
  color: #d8000c;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d8000c;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

export const PaymentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const PaymentButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #218838;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const Dropdown = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 16px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s;
  &:focus {
    border-color: #80bdff;
    outline: none;
  }
`;