import React, { useState, useEffect } from "react"
import {
  Button,
  Container,
  FormGroup,
  Input,
  Label,
  Select,
  StaticParkingNumber,
  Title,
  TotalAmount,
  WarningMessage,
} from "./CreateTicket.styled"
import toast from "react-hot-toast"

function CreateTicket() {
  const [carMake, setCarMake] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [phone, setPhone] = useState("")
  const [time_slot, setTime_slot] = useState("")
  const [totalAmount, setTotalAmount] = useState(0)
  const [zones, setZones] = useState([])
  const [selectedZone, setSelectedZone] = useState("")
  const [warningMessage, setWarningMessage] = useState("")

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

  const calculateTotalAmount = (duration) => {
    let price = 0
    switch (duration) {
      case "1":
        price = 10
        break
      case "2":
        price = 25
        break
      case "3":
        price = 40
        break
      default:
        price = 0
    }
    setTotalAmount(price)
  }

  const generateWarningMessage = () => {
    setWarningMessage(
      `Please be aware that if you exceed your selected parking duration, you will be fined 1 taka per second.`
    )
  }

  const generateParkingTicket = async () => {
    const selectedZoneData = zones.find((zone) => zone.name === selectedZone)
    const ticket = {
      zone: selectedZoneData ? selectedZoneData.park_owner : null,
      time_slot: time_slot,
      vehicle: {
        plate_number: vehicle,
        mobile_no: phone,
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
        throw new Error("Failed to create ticket")
      }

      const data = await response.json()
      toast.success("Ticket created:", data)
    } catch (error) {
      toast.error("Error creating ticket:", error)
    }
  }

  return (
    <>
      <Title>Create Ticket</Title>
      <Container>
        <FormGroup>
          <Label>Car Make</Label>
          <Input
            type="text"
            value={carMake}
            onChange={(e) => setCarMake(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Car Number</Label>
          <Input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Parking Zone</Label>
          <Select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="">Select Zone</option>
            {zones.map((zone) => (
              <option key={zone.name} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Parking Duration</Label>
          <Select
            value={time_slot}
            onChange={(e) => {
              setTime_slot(e.target.value)
              calculateTotalAmount(e.target.value)
              generateWarningMessage(parseInt(e.target.value))
            }}
          >
            <option value="">Select Duration</option>
            <option value="1">1 hour</option>
            <option value="2">3 hours</option>
            <option value="3">6 hours</option>
          </Select>
        </FormGroup>
        <TotalAmount>
          Total Amount:{" "}
          <span style={{ fontWeight: "bold" }}>{totalAmount}tk</span>
        </TotalAmount>
        <StaticParkingNumber>
          Parking Number: Zone 1, Parking Lot 7
        </StaticParkingNumber>
        {warningMessage && <WarningMessage>{warningMessage}</WarningMessage>}
        <Button onClick={generateParkingTicket}>Generate Parking Ticket</Button>
      </Container>
    </>
  )
}

export default CreateTicket
