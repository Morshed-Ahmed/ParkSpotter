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
import { storeParkingTicket } from "../../../Utils/Firebase/firebase"
import toast from "react-hot-toast"

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

  // Function to handle form submission and store parking ticket data
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const ticketData = {
        carMake,
        vehicle,
        phone,
        time_slot,
        totalAmount,
        parkingNumber,
      }
      const ticketId = await storeParkingTicket(ticketData)
      toast.success("Ticket created with ID: ", ticketId)
      // Clear form fields after successful ticket creation
      setCarMake("")
      setVehicle("")
      setPhone("")
      setTime_slot("")
      setTotalAmount(0)
      setWarningMessage("")
    } catch (error) {
      toast.error("Error creating ticket:", error.message)
      // Handle error (e.g., display error message to the user)
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
        <Button onClick={handleSubmit}>Generate Parking Ticket</Button>
      </Container>
    </>
  )
}

export default CreateTicket
