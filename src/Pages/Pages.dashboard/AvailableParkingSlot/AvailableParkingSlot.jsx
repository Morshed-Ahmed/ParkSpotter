import { useState, useEffect } from "react";
import { car } from "../../../assets/AvailableParkingSlotIcons/availabParkingIcons";
import {
  BoardContainer,
  Column,
  FilterContainer,
  Input,
  Select,
  Slot,
  theme,
  ZoneContainer,
  ZoneTitle,
} from "./AvailableParkingSlots.styled";
import toast from "react-hot-toast";
import styled from "styled-components";

const Tooltip = styled.div`
  visibility: hidden;
  width: 225px;
  background-color: #ddd;
  color: black;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  font-weight: 500;

  ${Slot}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const AvailableParkingSlotTest = () => {
  const [availableParkingSlots, setAvailableParkingSlots] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedZoneName, setSelectedZoneName] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchZonesAndSlots = async () => {
      try {
        let parkOwnerZones = [];

        if (userRole === "park_owner") {
          // Fetch all zones
          const token = localStorage.getItem("token");

          const zonesResponse = await fetch(
            "https://parkspotter-backened.onrender.com/accounts/zone/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          );
          if (!zonesResponse.ok) {
            throw new Error("Failed to fetch zones");
          }
          const zonesData = await zonesResponse.json();
          // Filter zones by park owner
          parkOwnerZones = zonesData.filter(
            (zone) => zone.park_owner.toString() === userId
          );
          setZones(parkOwnerZones);
        } else if (userRole === "employee") {
          // Fetch employee details
          const employeeResponse = await fetch(
            "https://parkspotter-backened.onrender.com/accounts/employee-list/"
          );
          if (!employeeResponse.ok) {
            throw new Error("Failed to fetch employees");
          }
          const employeesData = await employeeResponse.json();
          const employeeData = employeesData.find(
            (employee) => employee.employee.id.toString() === userId
          );
          console.log({ employeesData });
          console.log({ employeeData });
          if (!employeeData) {
            throw new Error("Employee not found");
          }
          const parkOwnerId = employeeData.park_owner_id;
          // Fetch all zones
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("Token not found in local storage");
            return;
          }
          const zonesResponse = await fetch(
            "https://parkspotter-backened.onrender.com/accounts/zone/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          );

          console.log({ zonesResponse });
          if (!zonesResponse.ok) {
            throw new Error("Failed to fetch zones");
          }
          const zonesData = await zonesResponse.json();
          // Filter zones by park owner id
          parkOwnerZones = zonesData.filter(
            (zone) => zone.park_owner === parkOwnerId
          );
          console.log({ parkOwnerZones });
          setZones(parkOwnerZones);
        }

        // Fetch all slots
        const slotsResponse = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/slot/"
        );
        if (!slotsResponse.ok) {
          throw new Error("Failed to fetch slots");
        }
        const slotsData = await slotsResponse.json();
        // Filter slots by park owner zones
        const parkOwnerZoneIds = parkOwnerZones.map((zone) => zone.id);
        const filteredSlots = slotsData.filter((slot) =>
          parkOwnerZoneIds.includes(slot.zone)
        );
        // console.log({ filteredSlots });
        setAvailableParkingSlots(filteredSlots);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again.");
      }
    };

    fetchZonesAndSlots();
  }, [userRole, userId]);

  const handleZoneNameChange = (event) => {
    setSelectedZoneName(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setSelectedAvailability(event.target.value);
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const filterSlots = () => {
    return availableParkingSlots.filter((slot) => {
      const matchesZone =
        selectedZoneName === "" ||
        zones.find((zone) => zone.id === slot.zone)?.name === selectedZoneName;
      const matchesAvailability =
        selectedAvailability === "" ||
        slot.available.toString() === selectedAvailability;
      const matchesSlot =
        selectedSlot === "" || slot.slot_number === parseInt(selectedSlot);
      return matchesZone && matchesAvailability && matchesSlot;
    });
  };

  const filteredSlots = filterSlots();

  const groupedParkingSlots = zones.reduce((acc, zone) => {
    const zoneSlots = filteredSlots.filter((slot) => slot.zone === zone.id);
    if (zoneSlots.length > 0) {
      acc[zone.name] = zoneSlots;
    }
    return acc;
  }, {});

  const [bookingData, setBookingData] = useState([]);
  const handleSlotHover = (slotNumber) => {
    // console.log(`Slot number ${slotNumber} hovered`);
    fetch("https://parkspotter-backened.onrender.com/accounts/bookings/")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const filterData = data.filter((dt) => dt.slot == slotNumber);
        setBookingData(filterData);
        // console.log(filterData);
      });
    // console.log(bookingData);
  };

  return (
    <div>
      <FilterContainer>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="slot-number"
              style={{ fontSize: "16px", fontWeight: "normal" }}
            >
              Enter Slot Number:
            </label>
            <Input
              type="number"
              id="slot-number"
              onChange={handleSlotChange}
              value={selectedSlot}
              placeholder="Slot Number"
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="availability-select"
              style={{ fontSize: "16px", fontWeight: "normal" }}
            >
              Select Availability:
            </label>
            <Select
              id="availability-select"
              onChange={handleAvailabilityChange}
              value={selectedAvailability}
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Booked</option>
            </Select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="zone-select"
              style={{ fontSize: "16px", fontWeight: "normal" }}
            >
              Select Zone:
            </label>
            <Select
              id="zone-select"
              onChange={handleZoneNameChange}
              value={selectedZoneName}
            >
              <option value="">Select Zone</option>
              {zones.map((zone, index) => (
                <option key={index} value={zone.name}>
                  {zone.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </FilterContainer>

      <div style={{ position: "relative" }}></div>
      {Object.keys(groupedParkingSlots).map((zone) => (
        <ZoneContainer key={zone}>
          <ZoneTitle>Zone {zone}</ZoneTitle>
          <BoardContainer>
            {groupedParkingSlots[zone].map((slot, index) => (
              <Column key={index}>
                <Slot
                  available={slot.available}
                  theme={theme}
                  onMouseEnter={() => handleSlotHover(slot.id)}
                >
                  {slot.available ? (
                    <>{slot.slot_number}</>
                  ) : (
                    <>
                      <img src={car} alt="Car in slot" />

                      <Tooltip>
                        {bookingData.map((booking) => (
                          <div key={booking.id}>
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: "5px",
                              }}
                            >
                              Ticket No:{" "}
                              <span style={{ color: "coral" }}>
                                {booking.ticket_no}
                              </span>
                            </p>
                            <p>
                              C/I Time:{" "}
                              {new Date(booking.check_in_time).toLocaleString()}
                            </p>
                            <p>
                              Approx. Time:{" "}
                              {new Date(
                                booking.appoximate_check_out_time
                              ).toLocaleString()}
                            </p>
                            <p>Plate No: {booking.vehicle.plate_number}</p>
                            <p>Mobile No: {booking.vehicle.mobile_no}</p>
                          </div>
                        ))}
                      </Tooltip>
                    </>
                  )}
                </Slot>
              </Column>
            ))}
          </BoardContainer>
        </ZoneContainer>
      ))}
    </div>
  );
};

export default AvailableParkingSlotTest;
