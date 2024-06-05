import { useState, useEffect } from "react";
import { Container, DetailItem, DetailLabel, DetailSection, DetailValue, Dropdown, FilterContainer, FineAlert, Input, PaidStatus, PaymentButton, PaymentContainer, RefreshButton, TicketContainer, TicketHeader, TicketNumber } from "./TicketPayment.styled";

const TicketPayment = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTicket, setFilteredTicket] = useState(null);
  const [ticketNumber, setTicketNumber] = useState("");
  const [zoneName, setZoneName] = useState("");
  const [slotNumber, setSlotNumber] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchTickets = async () => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
      if (role === "employee") {
        const employeeResponse = await fetch("https://parkspotter-backened.onrender.com/accounts/employee-list/");
        const employees = await employeeResponse.json();
        const employee = employees.find(emp => emp.employee.id === parseInt(userId));
        
        if (employee) {
          const parkOwnerId = employee.park_owner_id;
          const zoneResponse = await fetch(`https://parkspotter-backened.onrender.com/accounts/zone/?park_owner=${parkOwnerId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });
          const zones = await zoneResponse.json();
          const zoneIds = zones.map(zone => zone.id);

          const bookingsResponse = await fetch("https://parkspotter-backened.onrender.com/accounts/bookings/");
          const bookings = await bookingsResponse.json();
          const unpaidBookings = bookings.filter(booking => !booking.is_paid && zoneIds.includes(booking.zone));
          setTickets(unpaidBookings);
        }
      } else if (role === "parkowner") {
        const zoneResponse = await fetch(`https://parkspotter-backened.onrender.com/accounts/zone/?park_owner=${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const zones = await zoneResponse.json();
        const zoneIds = zones.map(zone => zone.id);

        const bookingsResponse = await fetch("https://parkspotter-backened.onrender.com/accounts/bookings/");
        const bookings = await bookingsResponse.json();
        const unpaidBookings = bookings.filter(booking => !booking.is_paid && zoneIds.includes(booking.zone));
        setTickets(unpaidBookings);
      }
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
        <label
          style={{ fontWeight: "bold", marginBottom: "5px" }}
          htmlFor="ticket-number"
        >
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
