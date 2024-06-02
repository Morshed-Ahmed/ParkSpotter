import { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormGroup,
  Input,
  Label,
  Select,
  Title,
  TotalAmount,
} from "./CreateTicket.styled";
import SlotSelector from "./SlotSelection/SlotSelection.component";
import toast from "react-hot-toast";
import { formatDateTime } from "./Util/formatDateTime";
import { json } from "react-router-dom";

function CreateTicket() {
  const [vehicle, setVehicle] = useState("");
  const [phone, setPhone] = useState("");
  const [checkInTime, setCheckInTime] = useState(formatDateTime(new Date()));
  const [checkoutTime, setCheckoutTime] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchZonesAndSlots = async () => {
      try {
        let zonesData = [];
        if (role === "park_owner") {
          const response = await fetch(
            "https://parkspotter-backened.onrender.com/accounts/zone/",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch zones");
          }
          const data = await response.json();
          zonesData = data.filter(
            (zone) => zone.park_owner.toString() === userId
          );
        } else if (role === "employee") {
          const employeeResponse = await fetch(
            "https://parkspotter-backened.onrender.com/accounts/employee-list/",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          if (!employeeResponse.ok) {
            throw new Error("Failed to fetch employee details");
          }
          const employees = await employeeResponse.json();
          const employee = employees.find(
            (emp) => emp.employee.id.toString() === userId
          );
          if (employee) {
            const parkOwnerId = employee.park_owner_id;
            const zoneResponse = await fetch(
              "https://parkspotter-backened.onrender.com/accounts/zone/",
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            if (!zoneResponse.ok) {
              throw new Error("Failed to fetch zones");
            }
            const allZones = await zoneResponse.json();
            zonesData = allZones.filter(
              (zone) => zone.park_owner === parkOwnerId
            );
          }
        }
        setZones(zonesData);

        const slotResponse = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/slot/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!slotResponse.ok) {
          throw new Error("Failed to fetch slots");
        }
        const slotsData = await slotResponse.json();
        setSlots(slotsData);
      } catch (error) {
        console.error("Error fetching zones and slots:", error);
      }
    };

    fetchZonesAndSlots();
  }, [role, userId, token]);

  useEffect(() => {
    if (checkInTime && checkoutTime) {
      calculateTotalAmount();
    }
  }, [checkInTime, checkoutTime]);

  const calculateTotalAmount = () => {
    const checkIn = new Date(checkInTime);
    const checkout = new Date(checkoutTime);
    const durationInMinutes = (checkout - checkIn) / 60000;
    const price = Math.max(0, durationInMinutes * 1);
    setTotalAmount(price);
  };
  console.log(zones);

  const generateParkingTicket = async () => {
    const selectedZoneData = zones.find((zone) => zone.name === selectedZone);
    const ticket = {
      zone: selectedZoneData ? selectedZoneData.id : null,
      // zone: selectedZoneData ? selectedZoneData.park_owner : null,
      check_in_time: checkInTime,
      appoximate_check_out_time: checkoutTime,
      employee: userId,
      vehicle: {
        plate_number: vehicle,
        mobile_no: phone,
      },
      slot: selectedSlot,
    };

    try {
      const response = await fetch(
        "https://parkspotter-backened.onrender.com/accounts/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(ticket),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const data = await response.json();
      toast.success("Ticket created:", data);
    } catch (error) {
      toast.error("Error creating ticket:", error);
    }
  };

  const filteredSlots = slots.filter((slot) => {
    const selectedZoneData = zones.find((zone) => zone.name === selectedZone);
    return selectedZoneData && slot.zone === selectedZoneData.id;
  });

  return (
    <>
      <Title>Create Ticket</Title>
      <Container>
        <FormGroup>
          <Label>Car Number</Label>
          <Input
            placeholder="Car number"
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            placeholder="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Parking Zone</Label>
          <Select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="">Select Zone</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Check-In Time</Label>
          <Input
            type="datetime-local"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Approximate Checkout Time</Label>
          <Input
            type="datetime-local"
            value={checkoutTime}
            onChange={(e) => setCheckoutTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Select Slot</Label>
          <SlotSelector
            slots={filteredSlots}
            selectedSlot={selectedSlot}
            onSlotSelect={(slot) => setSelectedSlot(slot)}
          />
        </FormGroup>
        <TotalAmount>
          Total Amount:{" "}
          <span style={{ fontWeight: "bold" }}>{totalAmount}tk</span>
        </TotalAmount>

        <Button onClick={generateParkingTicket}>Generate Parking Ticket</Button>
      </Container>
    </>
  );
}

export default CreateTicket;
// original
