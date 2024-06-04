import { useEffect, useState } from "react"
import styled from "styled-components"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

mapboxgl.accessToken =
  "pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #f5f5f7;
  min-height: 100vh;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

const Input = styled.input`
  padding: 10px 15px;
  width: 15%;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #202123;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const SmallButton = styled(Button)`
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 99px;
`

const MapContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 400px;
  }
`

const Tooltip = styled.span`
  visibility: hidden;
  width: 140px;
  background-color: #fff;
  color: #aaa;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: 50%;
  right: 0%;
  margin-left: -70px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`

const ParkOwnerLocation = () => {
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [address, setAddress] = useState("")
  const [area, setArea] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [parkOwnersUserId, setParkOwnersUserId] = useState(null)
  const [parkOwnersCurrentData, setParkOwnersCurrentData] = useState(null)

  useEffect(() => {
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (role !== "park_owner") return

    fetch(
      "https://parkspotter-backened.onrender.com/accounts/parkowner-list/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const parkOwnerData = data.find(
          (owner) => owner.park_owner_id.id === parseInt(user_id)
        )
        if (parkOwnerData) {
          setParkOwnersUserId(parkOwnerData.id)
          const { latitude, longitude } = parkOwnerData
          setParkOwnersCurrentData(parkOwnerData)

          const mapCenter =
            latitude && longitude ? [longitude, latitude] : [90.4125, 23.8103] 

          const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: mapCenter,
            zoom: 12,
          })

          setMap(map)

          if (latitude && longitude) {
            const marker = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(map)
            setMarker(marker)
          }

          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            placeholder: "Search for locations",
          })

          map.addControl(geocoder)

          geocoder.on("result", (event) => {
            const { center } = event.result
            map.flyTo({ center, zoom: 15 })
          })

          map.on("click", (e) => {
            const { lng, lat } = e.lngLat
            if (marker) {
              marker.remove()
            }
            const newMarker = new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .addTo(map)
            setMarker(newMarker)
            setLatitude(lat)
            setLongitude(lng)
            setShowForm(true)
          })
        }
      })
  }, [])

  const handleUpdate = () => {
    if (!parkOwnersUserId || !parkOwnersCurrentData) return

    const updatedData = {
      ...parkOwnersCurrentData,
      latitude,
      longitude,
      address,
      area,
    }

    fetch(
      `https://parkspotter-backened.onrender.com/accounts/parkowner-list/${parkOwnersUserId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update location")
        }
        return res.json()
      })
      .then((data) => {
        alert("Location updated successfully!")
        setShowForm(false)
      })
      .catch((error) => {
        alert("Error updating location: " + error.message)
      })
  }

  const handleRefresh = () => {
    if (map) {
      const center = map.getCenter()
      const zoom = map.getZoom()
      if (marker) {
        marker.remove()
        setMarker(null)
      }
      map.flyTo({ center, zoom })
    }
  }

  return (
    <Container>
      <FormContainer>
        <Input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <ButtonContainer>
          <Button onClick={handleUpdate}>Update Location</Button>
          <Tooltip>Update your parking lot's location</Tooltip>
        </ButtonContainer>
        <ButtonContainer>
          <SmallButton onClick={handleRefresh}>Remove Marker</SmallButton>
          <Tooltip>Remove the last marker on the map</Tooltip>
        </ButtonContainer>
      </FormContainer>
      <MapContainer id="map"></MapContainer>
    </Container>
  )
}

export default ParkOwnerLocation
