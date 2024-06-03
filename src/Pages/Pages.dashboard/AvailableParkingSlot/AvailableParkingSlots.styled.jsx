import styled from "styled-components";

export const theme = {
  primaryColor: "#202123",
  secondaryColor: "#ffffff",
  complementaryColor: "coral",
};

export const Title = styled.h1`
  text-align: center;
  color: coral;
  background-color: #fff;
  width: 28%;
  margin: 20px auto;
  border-radius: 25px;
  padding: 5px 0;
  font-size: 1.2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ZoneContainer = styled.div`
  background-color: #ffffff;
  padding: 0px 25px 50px 25px;
  display: ${({ isHidden }) => (isHidden ? "none" : "block")};
`;

export const ZoneTitle = styled.h2`
  margin: 30px 0;
  font-size: 22px;
  font-weight: bold;
  text-align: start;
  margin-bottom: 35px;
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  //   width: calc(100% / 6);
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  margin: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 60px 0;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const Slot = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 99px;
  background-color: ${({ available }) => (available ? "#00c04b" : "#fff")};
  color: ${({ theme }) => theme.secondaryColor};
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.complementaryColor};
  }
`;
