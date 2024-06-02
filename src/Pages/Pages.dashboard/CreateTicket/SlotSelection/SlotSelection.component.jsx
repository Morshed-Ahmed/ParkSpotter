import styled from "styled-components";

const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

const Slot = styled.div`
  padding: 10px;
  background-color: ${(props) =>
    props.available ? (props.selected ? "#4CAF50" : "#90EE90") : "#202123"};
  border: 1px solid #ccc;
  text-align: center;
  cursor: ${(props) => (props.available ? "pointer" : "not-allowed")};
  color: ${(props) => (props.available ? "#000" : "#fff")};

  &:hover {
    background-color: ${(props) =>
      props.available ? (props.selected ? "#45a049" : "#76c893") : "#202123"};
  }
`;

const SlotSelector = ({ slots, selectedSlot, onSlotSelect }) => {
  console.log(slots);
  return (
    <SlotGrid>
      {slots.map((slot) => (
        <Slot
          key={slot.id}
          available={slot.available}
          selected={selectedSlot === slot.id}
          onClick={() => slot.available && onSlotSelect(slot.id)}
        >
          {slot.slot_number}
        </Slot>
      ))}
    </SlotGrid>
  );
};

export default SlotSelector;
// original
