import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
  color: #202123;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
`;

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
`;

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
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PaidStatus = styled.span`
  color: ${(props) => (props.paid ? "green" : "red")};
  font-weight: bold;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const TicketContainer = styled.div`
  background: #ffffff;
  color: #333;
  padding: 20px;
  border-radius: 15px;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const TicketNumber = styled.h2`
  color: #007bff;
  margin: 0;
  font-size: 1.5em;
`;

const DetailSection = styled.div`
  margin-bottom: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const DetailValue = styled.span`
  color: #666;
`;

const FineAlert = styled.div`
  background: #ffdddd;
  color: #d8000c;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d8000c;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

const PaymentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaymentButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #218838;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Dropdown = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 16px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s;
  &:focus {
    border-color: #80bdff;
    outline: none;
  }
`;

const TicketPayment = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTicket, setFilteredTicket] = useState(null);
  const [ticketNumber, setTicketNumber] = useState("");
  const [zoneName, setZoneName] = useState("");
  const [slotNumber, setSlotNumber] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchTickets = async () => {
    try {
      const response = await fetch(
        "https://parkspotter-backened.onrender.com/accounts/bookings/"
      );
      const data = await response.json();
      const isPaidData = data.filter((ticket) => !ticket.is_paid);
      setTickets(isPaidData);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleInputChange = async (event) => {
    setTicketNumber(event.target.value);
    const matchedTicket = tickets.find(
      (ticket) => ticket.ticket_no === event.target.value
    );
    setFilteredTicket(matchedTicket);

    if (matchedTicket) {
      const token = localStorage.getItem("token");
      try {
        const zoneResponse = await fetch(
          `https://parkspotter-backened.onrender.com/accounts/zone/${matchedTicket.zone}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const zoneData = await zoneResponse.json();
        setZoneName(zoneData.name);

        const slotResponse = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/slot/"
        );
        const slotData = await slotResponse.json();
        const zoneFilter = slotData.filter(
          (zoneData) => zoneData.zone === matchedTicket.zone
        );
        const slotFind = zoneFilter.find(
          (slotData) => slotData.id === matchedTicket.slot
        );
        setSlotNumber(slotFind ? slotFind.slot_number : 0);
      } catch (error) {
        console.error("Error fetching zone or slot data:", error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateFine = (current, checkOut) => {
    if (!checkOut) {
      return { fine: 0, overtimeMinutes: 0 };
    }
    const overtime = new Date(current) - new Date(checkOut);
    if (overtime > 0) {
      const overtimeMinutes = Math.floor(overtime / 60000);
      const fine = 20 + overtimeMinutes;
      return { fine, overtimeMinutes };
    }
    return { fine: 0, overtimeMinutes: 0 };
  };

  const fineDetails = filteredTicket
    ? calculateFine(currentTime, filteredTicket.appoximate_check_out_time)
    : { fine: 0, overtimeMinutes: 0 };
  const totalAmount = filteredTicket
    ? filteredTicket.amount + fineDetails.fine
    : 0;

  const handlePayment = async () => {
    if (filteredTicket) {
      const token = localStorage.getItem("token");
      try {
        await fetch(
          `https://parkspotter-backened.onrender.com/accounts/bookings/${filteredTicket.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
              ...filteredTicket,
              is_paid: true,
              check_out_time: new Date(),
            }),
          }
        );

        setFilteredTicket({ ...filteredTicket, is_paid: true });
        setTickets(
          tickets.map((ticket) =>
            ticket.ticket_no === filteredTicket.ticket_no
              ? { ...ticket, is_paid: true }
              : ticket
          )
        );
        alert("Payment processed!");
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Failed to process payment.");
      }
    }
  };

  const handleRefresh = () => {
    fetchTickets();
    setFilteredTicket(null);
    setTicketNumber("");
  };

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
        <TicketContainer>
          <TicketHeader>
            <TicketNumber>{filteredTicket.ticket_no}</TicketNumber>
          </TicketHeader>
          <DetailSection>
            <DetailItem>
              <DetailLabel>Plate Number:</DetailLabel>
              <DetailValue>{filteredTicket.vehicle.plate_number}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Mobile No:</DetailLabel>
              <DetailValue>{filteredTicket.vehicle.mobile_no}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Check-in Time:</DetailLabel>
              <DetailValue>
                {new Date(filteredTicket.check_in_time).toLocaleString()}
              </DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Approx. Check-out Time:</DetailLabel>
              <DetailValue>
                {new Date(
                  filteredTicket.appoximate_check_out_time
                ).toLocaleString()}
              </DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Zone:</DetailLabel>
              <DetailValue>{zoneName}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Slot:</DetailLabel>
              <DetailValue>{slotNumber}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Rate per Minute:</DetailLabel>
              <DetailValue>{filteredTicket.rate_per_minute} BDT</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Paid Status:</DetailLabel>
              <PaidStatus paid={filteredTicket.is_paid}>
                {filteredTicket.is_paid ? "Paid" : "Unpaid"}
              </PaidStatus>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Parking Fee:</DetailLabel>
              <DetailValue>{filteredTicket.amount} BDT</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Check-out Time:</DetailLabel>
              <DetailValue>{currentTime.toLocaleString()}</DetailValue>
            </DetailItem>
            {fineDetails.fine > 0 && (
              <>
                <DetailItem>
                  <DetailLabel>Overtime Minutes:</DetailLabel>
                  <DetailValue>
                    {fineDetails.overtimeMinutes} minutes
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Fine Calculation:</DetailLabel>
                  <DetailValue>
                    20 BDT + {fineDetails.overtimeMinutes} (Overtime Minutes)
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Total Fine:</DetailLabel>
                  <DetailValue>{fineDetails.fine} BDT</DetailValue>
                </DetailItem>
                <FineAlert>
                  Note: A fine of {fineDetails.fine} BDT has been issued for not
                  picking up the car on time.
                </FineAlert>
              </>
            )}
            <DetailItem>
              <DetailLabel>Total Amount Due:</DetailLabel>
              <DetailValue>{totalAmount.toFixed(2)} BDT</DetailValue>
            </DetailItem>
          </DetailSection>
          <PaymentContainer>
            <Dropdown>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </Dropdown>
            <PaymentButton onClick={handlePayment}>Pay Now</PaymentButton>
          </PaymentContainer>
        </TicketContainer>
      )}
    </Container>
  );
};

export default TicketPayment;
