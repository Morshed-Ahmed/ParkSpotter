import styled from "styled-components"
import { FaCar } from "react-icons/fa"
import * as car from "../../../assets/AvailableParkingSlotIcons/availabParkingIcons"

const availableParkingSlots = [
  { zone: 1, slot: 1, available: true },
  { zone: 1, slot: 2, available: false },
  { zone: 1, slot: 3, available: true },
  { zone: 1, slot: 4, available: true },
  { zone: 1, slot: 5, available: false },
  { zone: 1, slot: 6, available: true },
  { zone: 1, slot: 7, available: true },
  { zone: 1, slot: 8, available: true },
  { zone: 1, slot: 9, available: false },
  { zone: 1, slot: 10, available: true },
  { zone: 1, slot: 11, available: true },
  { zone: 1, slot: 12, available: false },
  { zone: 1, slot: 13, available: false },
  { zone: 1, slot: 14, available: true },
  { zone: 1, slot: 15, available: true },
  { zone: 2, slot: 1, available: false },
  { zone: 2, slot: 2, available: true },
  { zone: 2, slot: 3, available: false },
  { zone: 2, slot: 4, available: true },
  { zone: 2, slot: 5, available: true },
  { zone: 2, slot: 6, available: false },
  { zone: 2, slot: 7, available: false },
  { zone: 2, slot: 8, available: false },
  { zone: 2, slot: 9, available: false },
  { zone: 2, slot: 10, available: true },
]

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Column = styled.div`
  width: calc(100% / 6);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Slot = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: ${({ available, theme }) =>
    available ? theme.primaryColor : "coral"};
  color: ${({ theme }) => theme.secondaryColor};
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.complementaryColor};
  }
`

const theme = {
  primaryColor: "#202123",
  secondaryColor: "#ffffff",
  complementaryColor: "coral",
}

const AvailableParkingSlot = () => {
  const groupByZone = (parkingSlots) => {
    const grouped = {}
    parkingSlots.forEach((slot) => {
      if (!grouped[slot.zone]) {
        grouped[slot.zone] = []
      }
      grouped[slot.zone].push(slot)
    })
    return grouped
  }

  const groupedParkingSlots = groupByZone(availableParkingSlots)

  return (
    <div>
      <h1>Available Parking Slots</h1>
      {Object.keys(groupedParkingSlots).map((zone) => (
        <div key={zone}>
          <h2 style={{margin:'30px 0'}}>Zone {zone}</h2>
          <BoardContainer>
            {groupedParkingSlots[zone].map((slot, index) => (
              <Column key={index}>
                <Slot available={slot.available} theme={theme}>
                  {slot.available ? slot.slot : <FaCar />}
                </Slot>
              </Column>
            ))}
          </BoardContainer>
        </div>
      ))}
    </div>
  )
}

export default AvailableParkingSlot
