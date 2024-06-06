import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #fff3cd;
  border-left: 5px solid #ffcc00;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 90%;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 10px auto;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin: 5px auto;
  }
`;

const WarningContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.hasBoth ? "space-between" : "center")};
  align-items: center;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const MessageWrapper = styled.div`
  margin: 10px;
  flex: 1;
  text-align: center;
`;

const Message = styled.p`
  margin: 20px 0;
  font-size: 1.125rem;
  color: #856404;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin: 10px;

  &:hover {
    background-color: #c82333;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
`;

const LocationAndZoneWarning = () => {
  const [parkOwnerData, setParkOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (role === "park_owner") {
      fetch("https://parkspotter-backened.onrender.com/accounts/parkowner-list/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const userData = data.find((item) => item.park_owner_id.id.toString() === user_id);
          setParkOwnerData(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching park owner data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (!parkOwnerData) {
    return <Wrapper>No data available.</Wrapper>;
  }

  const { capacity, latitude, longitude } = parkOwnerData;
  const showZoneWarning = capacity === "0";
  const showLocationWarning = !latitude || !longitude;

  // If neither warning is needed, return null
  if (!showZoneWarning && !showLocationWarning) {
    return null;
  }

  const hasBoth = showZoneWarning && showLocationWarning;

  return (
    <Wrapper>
      <WarningContainer hasBoth={hasBoth}>
        {showZoneWarning && (
          <MessageWrapper>
            <Message>You have not created a zone yet.</Message>
            <Button onClick={() => navigate("/dashboard/Zones")}>Create Zone</Button>
          </MessageWrapper>
        )}
        {showLocationWarning && (
          <MessageWrapper>
            <Message>You have not set the address of your parking lot on the map.</Message>
            <Button onClick={() => navigate("/dashboard/ParkOwnerLocation")}>Set Location</Button>
          </MessageWrapper>
        )}
      </WarningContainer>
    </Wrapper>
  );
};

export default LocationAndZoneWarning;
