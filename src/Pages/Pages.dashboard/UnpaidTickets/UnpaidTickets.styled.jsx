import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  color: #202123;
  padding: 20px 50px;
  border-radius: 8px;
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 150px;
  padding: 10px;
  border-radius: 35px;
  font-size: 0.8em;
  background-color: #202123;
  border: 6px solid #202123;
  color: #fff;
`;

export const SelectInput = styled.select`
  flex: 1;
  min-width: 150px;
  padding: 10px;
  border-radius: 12px;
  font-size: 0.8em;
  background-color: #202123;
  border: 6px solid #202123;
  color: #fff;
`;

export const TicketList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 35px;
  margin: 50px 0 0 0;
  padding: 15px;
`;

export const TicketItem = styled.div`
  background-color: #202123;
  color: #ffffff;
  padding: 35px 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const TicketDetail = styled.span`
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  padding: 7px 15px;
  background-color: #fff;
  color: #202123;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  & > svg {
    margin-right: 10px;
  }

  &:hover {
    transform: scale(1.08);
  }
`;

export const TotalTickets = styled.p`
  color: coral;
  font-weight: bold;
  text-align: right;
  font-size: 1.5em;
  margin-bottom: 35px;
`;
