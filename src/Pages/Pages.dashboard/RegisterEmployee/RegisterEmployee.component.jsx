import { useState } from "react"
import {
  Button,
  Form,
  FormContainer,
  Input,
  Label,
  Title,
} from "./RegisterEmployee.styled"
import toast from "react-hot-toast"
import { registerUser } from "../../../Utils/Firebase/firebase"
// import createEmployeeUser, { auth, db } from "../../../Utils/Firebase/firebase"

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser({
        ...formData,
        userType: "employee", // Set the userType to "employee"
      })
      toast.success("Employee registered successfully!") // Show success toast
      setFormData({
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
    } catch (error) {
      console.error("Error creating employee:", error.message)
      toast.error("Failed to register employee. Please try again.") // Show error toast
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
