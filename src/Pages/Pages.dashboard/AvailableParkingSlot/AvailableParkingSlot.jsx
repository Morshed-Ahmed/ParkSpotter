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
  ZoneContainer,
  ZoneTitle,
} from "./AvailableParkingSlots.styled"
import toast from "react-hot-toast"

const AvailableParkingSlotTest = () => {
  const [availableParkingSlots, setAvailableParkingSlots] = useState([])
  const [zones, setZones] = useState([])
  const [selectedZoneName, setSelectedZoneName] = useState("")
  const [selectedAvailability, setSelectedAvailability] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const userRole = localStorage.getItem("role")
  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    const fetchZonesAndSlots = async () => {
      try {
        let parkOwnerZones = []

        if (userRole === "park_owner") {
          // Fetch all zones
          const token = localStorage.getItem("token")

          const zonesResponse = await fetch(
            "https://parkspotter-backened.onrender.com/accounts/zone/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          )
          if (!zonesResponse.ok) {
            throw new Error("Failed to fetch zones")
          }
          const zonesData = await zonesResponse.json()
          // Filter zones by park owner
          parkOwnerZones = zonesData.filter(
            (zone) => zone.park_owner.toString() === userId
          )
          setZones(parkOwnerZones)
        } else if (userRole === "employee") {
          // Fetch employee details
          const employeeResponse = await fetch(
            "https://parkspotter-backened.onrender.com/accounts/employee-list/"
          )
          if (!employeeResponse.ok) {
            throw new Error("Failed to fetch employees")
          }
          const employeesData = await employeeResponse.json()
          const employeeData = employeesData.find(
            (employee) => employee.employee.id.toString() === userId
          )
          console.log({ employeesData })
          console.log({ employeeData })
          if (!employeeData) {
            throw new Error("Employee not found")
          }
          const parkOwnerId = employeeData.park_owner_id
          // Fetch all zones
          const token = localStorage.getItem("token")
          if (!token) {
            console.error("Token not found in local storage")
            return
          }
          const zonesResponse = await fetch(
            "https://parkspotter-backened.onrender.com/accounts/zone/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          )

          console.log({ zonesResponse })
          if (!zonesResponse.ok) {
            throw new Error("Failed to fetch zones")
          }
          const zonesData = await zonesResponse.json()
          // Filter zones by park owner id
          parkOwnerZones = zonesData.filter(
            (zone) => zone.park_owner === parkOwnerId
          )
          console.log({ parkOwnerZones })
          setZones(parkOwnerZones)
        }

        // Fetch all slots
        const slotsResponse = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/slot/"
        )
        if (!slotsResponse.ok) {
          throw new Error("Failed to fetch slots")
        }
        const slotsData = await slotsResponse.json()
        // Filter slots by park owner zones
        const parkOwnerZoneIds = parkOwnerZones.map((zone) => zone.id)
        const filteredSlots = slotsData.filter((slot) =>
          parkOwnerZoneIds.includes(slot.zone)
        )
        console.log({ filteredSlots })
        setAvailableParkingSlots(filteredSlots)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data. Please try again.")
      }
    }

    fetchZonesAndSlots()
  }, [userRole, userId])

  const handleZoneNameChange = (event) => {
    setSelectedZoneName(event.target.value)
  }

  const handleAvailabilityChange = (event) => {
    setSelectedAvailability(event.target.value)
  }

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value)
  }

  const filterSlots = () => {
    return availableParkingSlots.filter((slot) => {
      const matchesZone =
        selectedZoneName === "" ||
        zones.find((zone) => zone.id === slot.zone)?.name === selectedZoneName
      const matchesAvailability =
        selectedAvailability === "" ||
        slot.available.toString() === selectedAvailability
      const matchesSlot =
        selectedSlot === "" || slot.slot_number === parseInt(selectedSlot)
      return matchesZone && matchesAvailability && matchesSlot
    })
  }

  const filteredSlots = filterSlots()

  const groupedParkingSlots = zones.reduce((acc, zone) => {
    const zoneSlots = filteredSlots.filter((slot) => slot.zone === zone.id)
    if (zoneSlots.length > 0) {
      acc[zone.name] = zoneSlots
    }
    return acc
  }, {})

  return (
    <div>
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
              value={selectedAvailability}
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

      {Object.keys(groupedParkingSlots).map((zone) => (
        <ZoneContainer key={zone}>
          <ZoneTitle>Zone {zone}</ZoneTitle>
          <BoardContainer>
            {groupedParkingSlots[zone].map((slot, index) => (
              <Column key={index}>
                <Slot available={slot.available} theme={theme}>
                  {slot.available ? (
                    slot.slot_number
                  ) : (
                    <img src={car} alt="car" />
                  )}
                </Slot>
              </Column>
            ))}
          </BoardContainer>
        </ZoneContainer>
      ))}
    </div>
  )
}

export default AvailableParkingSlotTest
