import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #202123;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 95%;
  margin: -10px auto;
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #ffffff;
`

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #ffffff;
`

const Button = styled.button`
  width: 30%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  &:hover {
    background-color: #45a049;
  }
`

const TotalAmount = styled.div`
  margin-top: 20px;
  font-size: 18px;
`

const StaticParkingNumber = styled.div`
  margin-top: 20px;
  font-size: 18px;
`

const WarningMessage = styled.div`
  margin-top: 20px;
  color: #ff0000;
`

function CreateTicket() {
  const [carMake, setCarMake] = useState("")
  const [carNumber, setCarNumber] = useState("")
  const [phone, setPhone] = useState("")
  const [parkingDuration, setParkingDuration] = useState("")
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

  const generateParkingTicket = () => {
    const ticket = {
      carMake,
      carNumber,
      phone,
      parkingDuration,
      totalAmount,
      parkingNumber,
    }
    console.log("Parking ticket generated:", ticket)
  }

  return (
    <Container>
      <Title>Create Ticket</Title>
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
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
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
          value={parkingDuration}
          onChange={(e) => {
            setParkingDuration(e.target.value)
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
      <TotalAmount>Total Amount: {totalAmount}</TotalAmount>
      <StaticParkingNumber>Parking Number: {parkingNumber}</StaticParkingNumber>
      {warningMessage && <WarningMessage>{warningMessage}</WarningMessage>}
      <Button onClick={generateParkingTicket}>Generate Parking Ticket</Button>
    </Container>
  )
}

export default CreateTicket
