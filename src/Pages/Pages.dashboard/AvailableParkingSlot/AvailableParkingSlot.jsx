import { useState, useEffect } from "react"
import { car } from "../../../assets/AvailableParkingSlotIcons/availabParkingIcons"
import {
  BoardContainer,
  Column,
  FilterContainer,
  FilterItem,
  FilterSection,
  Input,
  Label,
  Select,
  Slot,
  theme,
  Title,
  ZoneContainer,
  ZoneTitle,
} from "./AvailableParkingSlots.styled"
import toast from "react-hot-toast"

const AvailableParkingSlotTest = () => {
  const [availableParkingSlots, setAvailableParkingSlots] = useState([])
  const [zones, setZones] = useState([])
  const [selectedZoneName, setSelectedZoneName] = useState("")
  const [selectedAvailability, setSelectedAvailability] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState("")

  useEffect(() => {
    const fetchParkingSlots = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/slot/"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch parking slots")
        }
        const data = await response.json()
        const correctedData = data.map((slot) => ({
          ...slot,
          available: !slot.available,
        }))
        setAvailableParkingSlots(correctedData)
      } catch (error) {
        console.error("Error fetching parking slots:", error)
      }
    }

    fetchParkingSlots()
  }, [])

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/zone/"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch zones")
        }
        const data = await response.json()
        setZones(data)
      } catch (error) {
        console.error("Error fetching zones:", error)
      }
    }

    fetchZones()
  }, [])

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

  const handleZoneNameChange = (event) => {
    setSelectedZoneName(event.target.value)
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
        (selectedZoneName === "" || slot.zone === selectedZoneName) &&
        (selectedAvailability === null ||
          slot.available === (selectedAvailability === "true")) &&
        (selectedSlot === "" || slot.slot_number === parseInt(selectedSlot))
    )
  }

  const filterZones = (zones, selectedZoneName) => {
    if (!selectedZoneName) return zones
    return zones.filter((zone) => zone.name === selectedZoneName)
  }

  const generateParkingTicket = async () => {
    const selectedZoneObj = zones.find((zone) => zone.name === selectedZoneName)
    const zoneNumber = selectedZoneObj ? selectedZoneObj.park_owner : null

    const ticket = {
      zone: zoneNumber,
      time_slot: 1,
      vehicle: {
        plate_number: "ABC123",
        mobile_no: "1234567890",
      },
    }

    try {
      const response = await fetch(
        "https://parkspotter-backened.onrender.com/accounts/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticket),
        }
      )

      if (!response.ok) {
        toast.error("Error creating ticket")
        throw new Error("Failed to create ticket")
      }

      const data = await response.json()
      toast.success("Ticket created:", data)
    } catch (error) {
      toast.error("Error creating ticket:", error)
    }
  }

  return (
    <div>
      {/* <Title>Available Parking Slots</Title> */}
      <FilterContainer>
        <FilterSection>
          <div>
            <Label htmlFor="slot-number">Enter Slot Number:</Label>
            <Input
              type="number"
              id="slot-number"
              onChange={handleSlotChange}
              value={selectedSlot}
              placeholder="Slot Number"
            />
          </div>
          <div>
            <Label htmlFor="availability-select">Select Availability:</Label>
            <Select
              id="availability-select"
              onChange={handleAvailabilityChange}
              value={selectedAvailability === null ? "" : selectedAvailability}
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Booked</option>
            </Select>
          </div>
        </FilterSection>
        <FilterItem>
          <div>
            <Label htmlFor="zone-select">Select Zone:</Label>
            <Select
              id="zone-select"
              onChange={handleZoneNameChange}
              value={selectedZoneName}
            >
              <option value="">Select Zone</option>
              {zones.map((zone, index) => (
                <option key={index} value={zone.name}>
                  {zone.name}
                </option>
              ))}
            </Select>
          </div>
        </FilterItem>
      </FilterContainer>

      {filterZones(Object.keys(groupedParkingSlots), selectedZoneName).map(
        (zone) => (
          <ZoneContainer key={zone}>
            <ZoneTitle>Zone {zone}</ZoneTitle>
            <BoardContainer>
              {filterSlots(groupedParkingSlots[zone] || []).map(
                (slot, index) => (
                  <Column key={index}>
                    <Slot available={slot.available} theme={theme}>
                      {slot.available ? slot.slot_number : <img src={car} />}
                    </Slot>
                  </Column>
                )
              )}
            </BoardContainer>
          </ZoneContainer>
        )
      )}
    </div>
  )
}

export default AvailableParkingSlotTest
