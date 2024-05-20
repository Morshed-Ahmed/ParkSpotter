import { useState, useEffect } from "react"
import styled from "styled-components"
import { car } from "../../../assets/AvailableParkingSlotIcons/availabParkingIcons"
import { fetchParkingSlots } from "../../../Utils/Firebase/firebase"
import toast from "react-hot-toast"

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Column = styled.div`
  width: calc(100% / 6);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  margin: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 60px 0;
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
  border-radius: 99px;
  background-color: ${({ available }) => (available ? "#00c04b" : "#fff")};
  color: ${({ theme }) => theme.secondaryColor};
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.complementaryColor};
  }
`

const FilterContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 20px 35px;
  padding: 24px;
  border-radius: 19px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const FilterLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
  color: #202123;
  font-size: 1rem;
  text-transform: uppercase;
`

const FilterInput = styled.input`
  padding: 5px 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  border: 4px solid #202123;
  background-color: #202123;
  color: #ffffff;
  font-size: 0.8rem;
  outline: none;
`

const FilterSelect = styled.select`
  padding: 5px 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  border: 4px solid #202123;
  background-color: #202123;
  color: #ffffff;
  font-size: 0.8rem;
  outline: none;
`

const Title = styled.h1`
  text-align: center;
  color: coral;
  background-color: #fff;
  width: 28%;
  margin: 20px auto;
  border-radius: 25px;
  padding: 5px 0;
  font-size: 1.2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const theme = {
  primaryColor: "#202123",
  secondaryColor: "#ffffff",
  complementaryColor: "coral",
}

const AvailableParkingSlot = () => {
  const [selectedZone, setSelectedZone] = useState(null)
  const [selectedAvailability, setSelectedAvailability] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState("")
  const [parkingSlots, setParkingSlots] = useState([])

  useEffect(() => {
    const loadParkingSlots = async () => {
      try {
        const slots = await fetchParkingSlots();
        console.log(slots);
        // setParkingSlots(slots);
      } catch (error) {
        toast.error("Failed to fetch parking slots");
      }
    }
    loadParkingSlots();
  }, []);


  // const parkingSlots = [
  //   { zone: 1, slot: 1, available: true },
  //   { zone: 1, slot: 2, available: false },
  //   { zone: "padma", slot: 1, available: false },
  //   { zone: "padma", slot: 18, available: true },
  //   { zone: 2, slot: 2, available: true },
  //   { zone: 3, slot: 2, available: false },
  //   { zone: 1, slot: 1, available: true },
  //   { zone: 1, slot: 2, available: false },
  //   { zone: "padma", slot: 1, available: false },
  //   { zone: "padma", slot: 18, available: false },
  //   { zone: 2, slot: 2, available: true },
  //   { zone: 3, slot: 2, available: true },
  //   { zone: 1, slot: 1, available: true },
  //   { zone: 1, slot: 2, available: false },
  //   { zone: "padma", slot: 1, available: false },
  //   { zone: "padma", slot: 18, available: false },
  //   { zone: 2, slot: 2, available: true },
  //   { zone: 3, slot: 2, available: true },
  // ]
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

  const groupedParkingSlots = groupByZone(parkingSlots)

  const handleZoneChange = (event) => {
    const selectedZone = event.target.value
    setSelectedZone(selectedZone === "" ? null : selectedZone)
  }

  const handleAvailabilityChange = (event) => {
    const selectedAvailability = event.target.value
    setSelectedAvailability(
      selectedAvailability === "" ? null : selectedAvailability === "true"
    )
  }

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value)
  }

  const filterSlots = (slots) => {
    return slots.filter(
      (slot) =>
        (selectedZone === null || slot.zone.toString() === selectedZone) &&
        (selectedAvailability === null ||
          slot.available === selectedAvailability) &&
        (selectedSlot === "" || slot.slot === parseInt(selectedSlot))
    )
  }

  return (
    <div>
      <Title>Available Parking Slots</Title>
      <FilterContainer>
        <FilterRow>
          <div>
            <FilterLabel htmlFor="slot-number">Enter Slot Number:</FilterLabel>
            <FilterInput
              type="number"
              id="slot-number"
              onChange={handleSlotChange}
              value={selectedSlot}
              placeholder="Slot Number"
            />
          </div>
          <div>
            <FilterLabel htmlFor="availability-select">
              Select Availability:
            </FilterLabel>
            <FilterSelect
              id="availability-select"
              onChange={handleAvailabilityChange}
              value={selectedAvailability === null ? "" : selectedAvailability}
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Booked</option>
            </FilterSelect>
          </div>
        </FilterRow>
        <FilterRow>
          <div>
            <FilterLabel htmlFor="zone-select">Select Zone:</FilterLabel>
            <FilterSelect
              id="zone-select"
              onChange={handleZoneChange}
              value={selectedZone || ""}
            >
              <option value="">All Zones</option>
              {Object.keys(groupedParkingSlots).map((zone) => (
                <option key={zone} value={zone}>
                  Zone {zone}
                </option>
              ))}
            </FilterSelect>
          </div>
        </FilterRow>
      </FilterContainer>
      {Object.keys(groupedParkingSlots).map((zone) => (
        <div
          key={zone}
          style={{
            display: selectedZone && selectedZone !== zone ? "none" : "block",
            backgroundColor: "#ffffff",
            padding: "0px 25px 50px 25px",
          }}
        >
          <h2
            style={{
              margin: "30px 0",
              fontSize: "22px",
              fontWeight: "bold",
              textAlign: "start",
              marginBottom: "35px",
            }}
          >
            Zone {zone}
          </h2>
          <BoardContainer>
            {filterSlots(groupedParkingSlots[zone] || []).map((slot, index) => (
              <Column key={index}>
                <Slot available={slot.available} theme={theme}>
                  {slot.available ? slot.slot : <img src={car} />}
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
