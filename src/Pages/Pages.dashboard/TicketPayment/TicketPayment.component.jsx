import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"

const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
  color: #202123;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  color: #ff6f61;
  margin-bottom: 20px;
`

const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 50px;
  border-radius: 7px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.39);
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  border: 2px solid #202123;
  border-radius: 4px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  outline: none;
  background-color: #202123;
  color: #fff;
`

const TicketCard = styled.div`
  background-color: #202123;
  color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`

const TicketDetail = styled.p`
  margin: 5px 0;
  font-size: 16px;
  padding: 10px 25px;
`

const PaymentSection = styled.div`
  color: #202123;
  font-weight: bold;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: green;
  color: #ffffff;
  border: none;
  border-radius: 99px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e55a50;
  }
`

const RefreshButton = styled.button`
  padding: 6px 10px;
  background-color: #202123;
  color: #ffffff;
  border: none;
  border-radius: 99px;
  font-size: 12px;
  cursor: pointer;
  margin-left: auto;
  margin-top: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6f61;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const PaidStatus = styled.span`
  color: ${(props) => (props.paid ? "green" : "red")};
  font-weight: bold;
  animation: ${fadeIn} 0.5s ease-in-out;
`

const TicketPayment = () => {
  const [tickets, setTickets] = useState([])
  const [filteredTicket, setFilteredTicket] = useState(null)
  const [ticketNumber, setTicketNumber] = useState("")

  const fetchTickets = async () => {
    try {
      // Replace with actual fetch call when needed
      // const response = await fetch("https://parkspotter-backened.onrender.com/accounts/tickets/");
      // if (!response.ok) {
      //   throw new Error("Failed to fetch tickets");
      // }
      // const data = await response.json();

      const data = [
        {
          ticket_number: "DEMO123",
          payment_amount: "45.00",
          created_time: "2024-05-20T14:30:00Z",
          paid: false,
          card_number: "XYZ789",
          mobile_number: "123-456-7890",
          owner_name: "Morshed Bhai",
          zone: "A",
          slot: "12",
        },
        {
          ticket_number: "DEMO456",
          payment_amount: "30.00",
          created_time: "2024-05-21T10:15:00Z",
          paid: true,
          card_number: "ABC123",
          mobile_number: "987-654-3210",
          owner_name: "Habib Bhai",
          zone: "B",
          slot: "34",
        },
      ]

      setTickets(data)
    } catch (error) {
      console.error("Error fetching tickets:", error)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const handleInputChange = (event) => {
    setTicketNumber(event.target.value)
    const matchedTicket = tickets.find(
      (ticket) => ticket.ticket_number === event.target.value
    )
    setFilteredTicket(matchedTicket)
  }

  const calculateDuration = (startTime) => {
    const start = new Date(startTime)
    const now = new Date()
    const duration = Math.abs(now - start)
    const hours = Math.floor(duration / (1000 * 60 * 60))
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours} hours ${minutes} minutes`
  }

  const handlePayment = () => {
    if (filteredTicket) {
      setFilteredTicket({ ...filteredTicket, paid: true })
      setTickets(
        tickets.map((ticket) =>
          ticket.ticket_number === filteredTicket.ticket_number
            ? { ...ticket, paid: true }
            : ticket
        )
      )
      alert("Payment processed!")
    }
  }

  const handleRefresh = () => {
    fetchTickets()
    setFilteredTicket(null)
    setTicketNumber("")
  }

  return (
    <Container>
      <FilterContainer>
        <label style={{ fontWeight: "bold" }} htmlFor="ticket-number">
          Enter Ticket Number:
        </label>
        <Input
          type="text"
          id="ticket-number"
          value={ticketNumber}
          onChange={handleInputChange}
          placeholder="Ticket Number"
        />
        <RefreshButton onClick={handleRefresh}>Refresh</RefreshButton>
      </FilterContainer>
      {filteredTicket && (
        <TicketCard>
          <TicketDetail>
            <strong>Ticket Number:</strong>{" "}
            <span style={{ color: "coral", fontWeight: "bold" }}>
              {filteredTicket.ticket_number}
            </span>
          </TicketDetail>

          <TicketDetail>
            <strong>Created Time:</strong>{" "}
            {new Date(filteredTicket.created_time).toLocaleString()}
          </TicketDetail>
          <TicketDetail>
            <strong>Paid Status:</strong>{" "}
            <PaidStatus paid={filteredTicket.paid}>
              {filteredTicket.paid ? "Paid" : "Unpaid"}
            </PaidStatus>
          </TicketDetail>

          <TicketDetail>
            <strong>Mobile Number:</strong> {filteredTicket.mobile_number}
          </TicketDetail>
          <TicketDetail>
            <strong>Owner&apos;s Name:</strong> {filteredTicket.owner_name}
          </TicketDetail>
          <div style={{ display: "flex" }}>
            <TicketDetail>
              <strong>Zone:</strong> {filteredTicket.zone}
            </TicketDetail>
            <TicketDetail>
              <strong>Slot:</strong> {filteredTicket.slot}
            </TicketDetail>
            <TicketDetail>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <strong>Payment Amount:</strong>
                <span style={{ color: "#39e75f", fontWeight: "bold" }}>
                  <span style={{ color: "white" }}>$</span>
                  {filteredTicket.payment_amount}
                </span>
              </div>
            </TicketDetail>
          </div>
          <TicketDetail>
            <strong>Duration:</strong>{" "}
            {calculateDuration(filteredTicket.created_time)}
          </TicketDetail>
          <PaymentSection>
            <Select>
              <option value="cash">Cash</option>
              {/* Add more payment options here */}
            </Select>
            <Button onClick={handlePayment}>Pay Now</Button>
          </PaymentSection>
        </TicketCard>
      )}
    </Container>
  )
}

export default TicketPayment
