import { useState } from "react"
import {
  Button,
  Form,
  FormContainer,
  Input,
  Label,
  Title,
} from "./RegisterEmployee.styled"

const EmployeeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    mobile_no: "",
    username: "",
    confirm_password: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    joined_date: "",
    qualification: "",
    nid_card_no: "",
    address: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   console.log(formData)
  // }

  // test
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const userId = localStorage.getItem("user_id")
  //   const data = {
  //     "username": "employee",
  //     "first_name": "Jafor_bhai",
  //     "last_name": "Sadek",
  //     "mobile_no": "0909090",
  //     "qualification": "A+",
  //     "nid_card_no": "498899",
  //     "email":"jafor@gmail.com",
  //     "password":"employee123",
  //     "confirm_password":"employee123",
  //     "address": "A/17, Road 6, Eastern Banakunjo 2, Banasree",
  //     "joined_date": "2024-05-18T23:23:34.469692+06:00",
  //     "park_owner_id": userId,

  // }

  //   try {
  //     const token = localStorage.getItem("token")

  //     const response = await fetch(
  //       "https://parkspottermain.pythonanywhere.com/accounts/employee-register/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Token ${token}`,
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     )

  //     if (response.status === 404) {
  //       console.error("Endpoint not found:", response.statusText)

  //       return
  //     }

  //     const responseData = await response.json()
  //     console.log("Parsed JSON response:", responseData)
  //   } catch (error) {
  //     console.error("Error creating employee:", error)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const userId = localStorage.getItem("user_id")
    const data = {
      park_owner_id: userId,
      username: "siyan2",
      first_name: "Jafor_bhai",
      last_name: "Sadek",
      mobile_no: "0000000111",
      qualification: "A+",
      nid_card_no: "498899",
      email: "jafor3@gmail.com",
      password: "employee123",
      confirm_password: "employee123",
      address: "A/17, Road 6, Eastern Banakunjo 2, Banasree",
      joined_date: "2024-05-18T23:23:34.469692+06:00",
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found in localStorage")
        return
      }

      const response = await fetch(
        "https://parkspottermain.pythonanywhere.com/accounts/employee-register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(data),
        }
      )

      if (response.status === 404) {
        console.error("Endpoint not found:", response.statusText)
        return
      }

      const responseData = await response.json()
      console.log("Parsed JSON response:", responseData)
    } catch (error) {
      console.error("Error creating employee:", error)
    }
  }

  return (
    <>
      {" "}
      <Title>Register Employee</Title>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="mobile_no">Mobile No</Label>
          <Input
            type="text"
            id="mobile_no"
            name="mobile_no"
            value={formData.mobile_no}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            // required
          />

          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            // required
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            // required
          />

          <Label htmlFor="confirm_password">Confirm Password</Label>
          <Input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm your password"
            // required
          />

          <Label htmlFor="first_name">First Name</Label>
          <Input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            // required
          />

          <Label htmlFor="last_name">Last Name</Label>
          <Input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            // required
          />

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            // required
          />

          <Label htmlFor="joined_date">Joined Date</Label>
          <Input
            type="datetime-local"
            id="joined_date"
            name="joined_date"
            value={formData.joined_date}
            onChange={handleChange}
            // required
          />

          <Label htmlFor="nid_card_no">NID Card No</Label>
          <Input
            type="text"
            id="nid_card_no"
            name="nid_card_no"
            value={formData.nid_card_no}
            onChange={handleChange}
            placeholder="Enter your NID card number"
          />

          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />

          <Button type="submit">Register</Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default EmployeeRegistrationForm
// original
