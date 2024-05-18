import { useState } from "react"
import styled from "styled-components"
import { FaCar, FaTicketAlt, FaCalendarAlt } from "react-icons/fa"

const Container = styled.div`
  background-color: #ffffff;
  color: #ffffff;
  padding: 20px 50px;
  border-radius: 8px;
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`

const Title = styled.h1`
  color: coral;
  background-color: #fff;
  margin: 0 auto 60px auto;
  text-align: center;
  width: 22%;
  border-radius: 35px;
  font-size: 1.2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 5px 7px;
`

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`

const SearchInput = styled.input`
  flex: 1;
  min-width: 150px;
  padding: 10px;
  border-radius: 35px;
  font-size: 0.8em;
  background-color: #202123;
  border: 6px solid #202123;

  color: #fff;
`

const SelectInput = styled.select`
  flex: 1;
  min-width: 150px;
  padding: 10px;
  border-radius: 12px;
  font-size: 0.8em;
  background-color: #202123;
  border: 6px solid #202123;
  color: #fff;
`

const TicketList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 35px;
  margin: 50px 0 0 0;
  padding: 15px;
`

const TicketItem = styled.div`
  background-color: #fff;
  color: #202123;
  padding: 35px 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

const TicketDetail = styled.span`
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  padding: 7px 15px;
  background-color: #202123;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  & > svg {
    margin-right: 10px;
  }

  &:hover {
    transform: scale(1.08);
  }
`

const TotalTickets = styled.p`
  color: coral;
  font-weight: bold;
  text-align: right;
  font-size: 1.5em;
  margin-bottom: 35px;
`

const UnpaidTickets = () => {
  const tickets = [
    {
      number: "12345",
      carMake: "Toyota",
      carNumberPlate: "ABC123",
      date: "2023-05-15",
    },
    {
      number: "67890",
      carMake: "Honda",
      carNumberPlate: "XYZ789",
      date: "2023-05-16",
    },

    {
      number: "12345",
      carMake: "Toyota",
      carNumberPlate: "ABC123",
      date: "2023-05-15",
    },
    {
      number: "67890",
      carMake: "Honda",
      carNumberPlate: "XYZ789",
      date: "2023-05-16",
    },

    {
      number: "12345",
      carMake: "Toyota",
      carNumberPlate: "ABC123",
      date: "2023-05-15",
    },
    {
      number: "67890",
      carMake: "Honda",
      carNumberPlate: "XYZ789",
      date: "2023-05-16",
    },

    {
      number: "12345",
      carMake: "Toyota",
      carNumberPlate: "ABC123",
      date: "2023-05-15",
    },
    {
      number: "67890",
      carMake: "Honda",
      carNumberPlate: "XYZ789",
      date: "2023-05-16",
    },

    {
      number: "12345",
      carMake: "Toyota",
      carNumberPlate: "ABC123",
      date: "2023-05-15",
    },
    {
      number: "67890",
      carMake: "Honda",
      carNumberPlate: "XYZ789",
      date: "2023-05-16",
    },

    {
      number: "12345",
      carMake: "Toyota",
      carNumberPlate: "ABC123",
      date: "2023-05-15",
    },
    {
      number: "67890",
      carMake: "Honda",
      carNumberPlate: "XYZ789",
      date: "2023-05-16",
    },

    {
      number: "12345",
      carMake: "Toyota",
      carNumberPlate: "ABC123",
      date: "2023-05-15",
    },
    {
      number: "67890",
      carMake: "Honda",
      carNumberPlate: "XYZ789",
      date: "2023-05-16",
    },
  ]
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") {
      return (
        ticket.number.toLowerCase().includes(search.toLowerCase()) ||
        ticket.carMake.toLowerCase().includes(search.toLowerCase()) ||
        ticket.carNumberPlate.toLowerCase().includes(search.toLowerCase()) ||
        ticket.date.toLowerCase().includes(search.toLowerCase())
      )
    } else {
      return ticket[filter].toLowerCase().includes(search.toLowerCase())
    }
  })


  

  return (
    <Container>
      <Title>Unpaid Tickets</Title>
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
        </SelectInput>
      </SearchContainer>
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
            </TicketInfo>
          </TicketItem>
        ))}
      </TicketList>
    </Container>
  )
}

export default UnpaidTickets
