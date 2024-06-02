
import { useState, useEffect } from "react";
import axios from "axios";
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

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://parkspotter-backened.onrender.com/accounts/bookings/"
        );
        const unpaidTickets = response.data.filter((ticket) => !ticket.is_paid);
        setTickets(unpaidTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = (field) => {
      const fieldValue = field.split('.').reduce((o, i) => (o ? o[i] : undefined), ticket);
      return fieldValue && fieldValue.toString().toLowerCase().includes(search.toLowerCase());
    };

    const isWithinPriceRange = () => {
      const price = parseFloat(ticket.amount);
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && price < min) return false;
      if (!isNaN(max) && price > max) return false;
      return true;
    };

    if (filter === "all") {
      return (
        matchesSearch("ticket_no") ||
        matchesSearch("vehicle.plate_number") ||
        matchesSearch("check_in_time")
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
          <option value="ticket_no">Ticket Number</option>
          <option value="vehicle.plate_number">Car Number Plate</option>
          <option value="check_in_time">Date</option>
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
        {filteredTickets.map((ticket) => (
          <TicketItem key={ticket.id}>
            <TicketInfo>
              <TicketDetail>
                <span>
                  <FaTicketAlt />
                  <span style={{ fontWeight: "bold" }}>Ticket No:</span>
                </span>
                <span className="highlight">{ticket.ticket_no}</span>
              </TicketDetail>
              <TicketDetail>
                <span>
                  <FaCar />
                  <span style={{ fontWeight: "bold" }}>Car Number Plate:</span>
                </span>
                <span>{ticket.vehicle.plate_number}</span>
              </TicketDetail>
              <TicketDetail>
                <span>
                  <FaCalendarAlt />
                  <span style={{ fontWeight: "bold" }}>Date:</span>
                </span>
                <span>{new Date(ticket.check_in_time).toLocaleDateString()}</span>
              </TicketDetail>
              <TicketDetail>
                <span>
                  <FaMoneyBillAlt />
                  <span style={{ fontWeight: "bold" }}>Payment Amount:</span>
                </span>
                <span className="highlight">${ticket.amount.toFixed(2)}</span>
              </TicketDetail>
            </TicketInfo>
          </TicketItem>
        ))}
      </TicketList>
    </Container>
  );
};

export default UnpaidTickets;