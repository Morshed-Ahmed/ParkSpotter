import { useEffect, useState } from "react"
import { FaCar, FaTicketAlt, FaCalendarAlt } from "react-icons/fa"
import {
  Container,
  SearchContainer,
  SearchInput,
  SelectInput,
  SelectPaymentType,
  TicketDetail,
  TicketInfo,
  TicketItem,
  TicketList,
  Title,
  TotalTickets,
} from "./UnpaidTickets.styled"
import {
  deleteAndStoreParkingTicket,
  fetchAllParkingTickets,
} from "../../../Utils/Firebase/firebase"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const UnpaidTickets = () => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true) // State to manage loading state
  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    fetchAllParkingTickets()
      .then((data) => {
        setTickets(data)
        setLoading(false) // Update loading state once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data from Firebase:", error)
        setLoading(false) // Update loading state if there's an error
      })
  }, []) // Empty dependency array ensures this effect runs only once on mount

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteAndStoreParkingTicket(ticketId) // Call the deleteAndStoreParkingTicket function with the ticket ID
      // Optionally, you can update the state or perform any other actions after successful deletion
      toast.success("Ticket deleted successfully.")
      window.location.reload()
    } catch (error) {
      // Handle any errors that occur during the deletion process
      toast.error("Error deleting ticket:", error.message)
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") {
      return (
        ticket?.number?.toLowerCase().includes(search.toLowerCase()) ||
        ticket?.carMake?.toLowerCase().includes(search.toLowerCase()) ||
        ticket?.carNumberPlate?.toLowerCase().includes(search.toLowerCase()) ||
        ticket?.date?.toLowerCase().includes(search.toLowerCase())
      )
    } else {
      return ticket[filter].toLowerCase().includes(search.toLowerCase())
    }
  })

  return (
    <Container>
      <Title>Unpaid Tickets</Title>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        >
          <div role="status">
            <span
              style={{ color: "#202123", fontSize: "30px", fontWeight: "bold" }}
            >
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <>
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
            <SelectInput
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
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
                        style={{
                          fontWeight: "bold",
                          justifySelf: "flex-start",
                        }}
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
                    <SelectPaymentType>
                      <option style={{ padding: "12px 4px" }} value="cash">
                        Cash
                      </option>
                    </SelectPaymentType>
                    <button
                      style={{
                        marginLeft: "auto",
                        backgroundColor: "green",
                        padding: "5px 9px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        fontSize: "0.8em",
                        color: "#fff",
                      }}
                      onClick={() => handleDeleteTicket(ticket.id)}
                    >
                      Payment
                    </button>
                  </TicketDetail>
                </TicketInfo>
              </TicketItem>
            ))}
          </TicketList>
        </>
      )}
    </Container>
  )
}

export default UnpaidTickets
