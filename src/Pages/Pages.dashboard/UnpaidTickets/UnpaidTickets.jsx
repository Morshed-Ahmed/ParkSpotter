import { useState } from "react";
import {
  FaCar,
  FaTicketAlt,
  FaCalendarAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
import {
  Container,
  SearchContainer,
  SearchInput,
  SelectInput,
  TicketDetail,
  TicketInfo,
  TicketItem,
  TicketList,
  TotalTickets,
} from "./UnpaidTickets.styled";

const UnpaidTickets = () => {
  const tickets = [
    {
      number: "12345",
      carMake: "Toyota",
      carNumberPlate: "ABC123",
      date: "2023-05-15",
      paymentAmount: "50.00",
    },
    {
      number: "67890",
      carMake: "Honda",
      carNumberPlate: "XYZ789",
      date: "2023-05-16",
      paymentAmount: "30.00",
    },
    // Add more tickets as needed
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = (field) =>
      ticket[field].toLowerCase().includes(search.toLowerCase());

    const isWithinPriceRange = () => {
      const price = parseFloat(ticket.paymentAmount);
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && price < min) return false;
      if (!isNaN(max) && price > max) return false;
      return true;
    };

    if (filter === "all") {
      return (
        matchesSearch("number") ||
        matchesSearch("carMake") ||
        matchesSearch("carNumberPlate") ||
        matchesSearch("date")
      );
    } else if (filter === "price") {
      return isWithinPriceRange();
    } else {
      return matchesSearch(filter);
    }
  });

  return (
    <Container>
      <TotalTickets>
        <span style={{ color: "#202123" }}>Total Unpaid Tickets:</span>{" "}
        <span style={{ color: "coral" }}>{filteredTickets.length}</span>
      </TotalTickets>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SelectInput value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="number">Ticket Number</option>
          <option value="carMake">Car Make</option>
          <option value="carNumberPlate">Car Number Plate</option>
          <option value="date">Date</option>
          <option value="price">Price Range</option>
        </SelectInput>
      </SearchContainer>
      {filter === "price" && (
        <SearchContainer>
          <SearchInput
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={minPrice}
            onChange={handlePriceChange}
          />
          <SearchInput
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handlePriceChange}
          />
        </SearchContainer>
      )}
      <TicketList>
        {filteredTickets.map((ticket, index) => (
          <TicketItem key={index}>
            <TicketInfo>
              <TicketDetail>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "70%",
                  }}
                >
                  <FaTicketAlt style={{ marginRight: "10px" }} />
                  <span style={{ fontWeight: "bold" }}>Ticket No:</span>
                </span>
                <span
                  style={{
                    color: "coral",
                    width: "30%",
                    textAlign: "end",
                    fontWeight: "bold",
                  }}
                >
                  {ticket.number}
                </span>
              </TicketDetail>
              <TicketDetail>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "70%",
                  }}
                >
                  <FaCar style={{ marginRight: "10px" }} />
                  <span
                    style={{ fontWeight: "bold", justifySelf: "flex-start" }}
                  >
                    Car Make:
                  </span>
                </span>
                <span style={{ width: "30%", textAlign: "end" }}>
                  {ticket.carMake}
                </span>
              </TicketDetail>
              <TicketDetail>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "70%",
                  }}
                >
                  <FaCar style={{ marginRight: "10px" }} />
                  <span style={{ fontWeight: "bold" }}>Number Plate:</span>
                </span>
                <span style={{ width: "30%", textAlign: "end" }}>
                  {ticket.carNumberPlate}
                </span>
              </TicketDetail>
              <TicketDetail>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "50%",
                  }}
                >
                  <FaCalendarAlt style={{ marginRight: "10px" }} />
                  <span style={{ fontWeight: "bold" }}>Date:</span>
                </span>
                <span style={{ width: "50%", textAlign: "end" }}>
                  {ticket.date}
                </span>
              </TicketDetail>
              <TicketDetail>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "70%",
                  }}
                >
                  <FaMoneyBillAlt style={{ marginRight: "10px" }} />
                  <span style={{ fontWeight: "bold" }}>Payment Amount:</span>
                </span>
                <span
                  style={{
                    width: "30%",
                    textAlign: "end",
                    color: "coral",
                    fontWeight: "bold",
                  }}
                >
                  ${ticket.paymentAmount}
                </span>
              </TicketDetail>
            </TicketInfo>
          </TicketItem>
        ))}
      </TicketList>
    </Container>
  );
};

export default UnpaidTickets;
