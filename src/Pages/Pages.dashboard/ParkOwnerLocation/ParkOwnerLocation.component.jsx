import { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import {
  Button,
  ButtonContainer,
  Container,
  FormContainer,
  Input,
  MapContainer,
  SmallButton,
  Tooltip,
} from "./ParkOwnersLocation.styled"

mapboxgl.accessToken =
  "pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg"

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
          Authorization: `Token ${token}`,
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
          setParkOwnersCurrentData(parkOwnerData)

          const { latitude, longitude } = parkOwnerData
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
            setLatitude(lat.toFixed(6))
            setLongitude(lng.toFixed(6))
            setShowForm(true)
          })
        }
      })
  }, [])

  const handleUpdate = () => {
    if (!parkOwnersUserId || !parkOwnersCurrentData) return

    const updatedData = {
      ...parkOwnersCurrentData,
      latitude: parseFloat(latitude).toFixed(6),
      longitude: parseFloat(longitude).toFixed(6),
      address,
      area,
    }

    fetch(
      `https://parkspotter-backened.onrender.com/accounts/parkowner-list/${parkOwnersUserId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
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
        console.log(error)
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
