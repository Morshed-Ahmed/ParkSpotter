import { useState } from "react"
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

function CreateTicket() {
  const [carMake, setCarMake] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [phone, setPhone] = useState("")
  const [time_slot, setTime_slot] = useState("")
  const [totalAmount, setTotalAmount] = useState(0)
  const parkingNumber = "Zone 1, Parking Lot 7"
  const [warningMessage, setWarningMessage] = useState("")

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

  // const generateParkingTicket = () => {
  //   const ticket = {
  //     // carMake,
  //     vehicle,
  //     // phone,
  //     time_slot,
  //     // totalAmount,
  //     // parkingNumber
  //   }

  //   fetch("https://parkspottermain.pythonanywhere.com/accounts/bookings/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(ticket),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to create ticket")
  //       }
  //       return response.json()
  //     })
  //     .then((data) => {
  //       console.log("Ticket created:", data)
  //     })
  //     .catch((error) => {
  //       console.error("Error creating ticket:", error)
  //     })
  // }

  // test

  const generateParkingTicket = () => {
    const token = localStorage.getItem("token")

    if (!token) {
      console.error("Authentication token not available")
      return
    }
    const user_id = localStorage.getItem("user_id")

    const data = {
      park_owner_id: user_id,
      zone: 1,
      time_slot: 1,
      vehicle: {
        plate_number: "ABC123",
        mobile_no: "1234567890",
      },
    }

    fetch("https://parkspottermain.pythonanywhere.com/accounts/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create ticket")
        }

        return response.json()
      })
      .then((data) => {
        console.log("Ticket created:", data)
      })
      .catch((error) => {
        console.error("Error creating ticket:", error)
      })
  }

  return (
    <>
      {" "}
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
          Parking Number: {parkingNumber}
        </StaticParkingNumber>
        {warningMessage && <WarningMessage>{warningMessage}</WarningMessage>}
        <Button onClick={generateParkingTicket}>Generate Parking Ticket</Button>
      </Container>
    </>
  )
}

export default CreateTicket

// original
