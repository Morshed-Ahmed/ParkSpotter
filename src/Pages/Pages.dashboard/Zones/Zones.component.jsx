import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import axios from "axios"

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 20px;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 20px;
  }
`

const Sidebar = styled.div`
  flex: 1;
  margin-bottom: 20px;
  padding: 20px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    margin-right: 40px;
    margin-bottom: 0;
  }
`

const MainContent = styled.div`
  flex: 2;
  padding: 20px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`

const Title = styled.h1`
  text-align: center;
  color: #1f1f1f;
  font-weight: 600;
  font-size: 26px;
  margin-bottom: 20px;
  margin-top: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #fefefe;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007aff;
    box-shadow: 0 0 8px rgba(0, 122, 255, 0.5);
    outline: none;
  }
`

const Button = styled.button`
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #202123;
  color: white;
  border: none;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const Select = styled.select`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007aff;
    box-shadow: 0 0 8px rgba(0, 122, 255, 0.5);
    outline: none;
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

const ZoneList = styled.ul`
  list-style: none;
  padding: 0;
  animation: ${fadeIn} 0.5s ease-in-out;
`

const ZoneItem = styled.li`
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 10px;
  border-radius: 15px;
  background: #fefefe;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin: 0 0 10px;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
`

const SlotTile = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 10px;
  background-color: ${(props) => (props.available ? "#28a745" : "#dc3545")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.available ? "#218838" : "#c82333")};
  }
`

const SlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`

const Error = styled.p`
  color: #dc3545;
  text-align: center;
`

const Zones = () => {
  const [name, setName] = useState("")
  const [capacity, setCapacity] = useState("")
  const [zones, setZones] = useState([])
  const [slots, setSlots] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [expandedZones, setExpandedZones] = useState({})
  const [zoneFilter, setZoneFilter] = useState("")
  const [slotFilter, setSlotFilter] = useState("")

  useEffect(() => {
    fetchZones()
    fetchSlots()
  }, [])

  const fetchZones = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get(
        "https://parkspotter-backened.onrender.com/accounts/zone/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      setZones(response.data)
    } catch (error) {
      console.error("Error fetching zones:", error)
    }
  }

  const fetchSlots = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get(
        "https://parkspotter-backened.onrender.com/accounts/slot/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      const slotsByZone = response.data.reduce((acc, slot) => {
        if (!acc[slot.zone]) acc[slot.zone] = []
        acc[slot.zone].push(slot)
        return acc
      }, {})
      setSlots(slotsByZone)
    } catch (error) {
      console.error("Error fetching slots:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")
    setLoading(true)

    try {
      const response = await axios.post(
        "https://parkspotter-backened.onrender.com/accounts/zone/",
        {
          park_owner: user_id,
          name,
          capacity,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )

      setZones([...zones, response.data])
      setName("")
      setCapacity("")
      setError(null)
    } catch (error) {
      setError("Error creating zone")
      console.error("Error creating zone:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleZoneExpansion = (zoneId) => {
    setExpandedZones((prev) => ({ ...prev, [zoneId]: !prev[zoneId] }))
  }

  const handleSlotClick = async (slot) => {
    const token = localStorage.getItem("token")
    try {
      const updatedSlot = { ...slot, available: !slot.available }
      await axios.put(
        `https://parkspotter-backened.onrender.com/accounts/slot/${slot.id}/`,
        updatedSlot,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      setSlots((prevSlots) => ({
        ...prevSlots,
        [slot.zone]: prevSlots[slot.zone].map((s) =>
          s.id === slot.id ? updatedSlot : s
        ),
      }))
    } catch (error) {
      console.error("Error updating slot:", error)
    }
  }

  const getAvailableSlotsCount = (zoneId) => {
    return (slots[zoneId] || []).filter((slot) => slot.available).length
  }

  const filteredZones = zones.filter(
    (zone) =>
      zone.name.toLowerCase().includes(zoneFilter.toLowerCase()) &&
      (!slotFilter ||
        slots[zone.id]?.some(
          (slot) => slot.available.toString() === slotFilter
        ))
  )

  const filteredSlots = (zoneId) => {
    if (!slotFilter) return slots[zoneId] || []
    return (slots[zoneId] || []).filter(
      (slot) => slot.available.toString() === slotFilter
    )
  }

  return (
    <Container>
      <Sidebar>
        <Title>Create Zone</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Zone Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Zone"}
          </Button>
        </Form>
        <Title>Filters</Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
          >
            <option value="">All Zones</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </Select>
          <Select
            value={slotFilter}
            onChange={(e) => setSlotFilter(e.target.value)}
          >
            <option value="">All Slots</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </Select>
        </div>
      </Sidebar>
      <MainContent>
        <Title>List of Zones</Title>
        <ZoneList>
          {filteredZones.map((zone) => (
            <ZoneItem
              key={zone.id}
              onClick={() => toggleZoneExpansion(zone.id)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>Name:&nbsp;{zone.name}</h3>
                <div>
                  <p>Capacity: {zone.capacity}</p>
                  <p>Available Slots: {getAvailableSlotsCount(zone.id)}</p>
                </div>
              </div>

              {expandedZones[zone.id] && (
                <SlotContainer>
                  {filteredSlots(zone.id).map((slot) => (
                    <SlotTile
                      key={slot.id}
                      available={slot.available}
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot.slot_number}
                    </SlotTile>
                  ))}
                </SlotContainer>
              )}
            </ZoneItem>
          ))}
        </ZoneList>
      </MainContent>
    </Container>
  )
}

export default Zones
