import { useState } from "react";
import {
  Button,
  Form,
  FormContainer,
  Input,
  Label,
  Title,
} from "./RegisterEmployee.styled";
import toast from "react-hot-toast";

const EmployeeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    mobile_no: "",
    username: "",
    email: "",
    confirm_password: "",
    password: "",
    first_name: "",
    last_name: "",
    joined_date: "",
    qualification: "",
    nid_card_no: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    const payload = { ...formData };
    // delete payload.confirm_password;
    console.log(payload);

    const employeeData = {
      username: payload.username,
      first_name: payload.first_name,
      last_name: payload.last_name,
      qualification: payload.qualification,
      mobile_no: payload.mobile_no,
      nid_card_no: payload.nid_card_no,
      email: payload.email,
      password: payload.password,
      confirm_password: payload.confirm_password,
      address: payload.address,
      joined_date: payload.joined_date,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://parkspotter-backened.onrender.com/accounts/employee-register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register employee");
      }

      const data = await response.json();
      console.log("Employee registered:", data);
      toast.success("Employee registered successfully");
      setFormData({
        mobile_no: "",
        username: "",
        email: "",
        confirm_password: "",
        password: "",
        first_name: "",
        last_name: "",
        joined_date: "",
        qualification: "",
        nid_card_no: "",
        address: "",
      });
    } catch (error) {
      console.error("Error registering employee:", error);
      toast.error("Error registering employee");
    }
  };

  return (
    <>
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
            required
          />

          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <Label htmlFor="confirm_password">Confirm Password</Label>
          <Input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          <Label htmlFor="first_name">First Name</Label>
          <Input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />

          <Label htmlFor="last_name">Last Name</Label>
          <Input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />

          <Label htmlFor="qualification">Qualification</Label>
          <Input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="Enter your qualification"
            required
          />

          <Label htmlFor="joined_date">Joined Date</Label>
          <Input
            type="datetime-local"
            id="joined_date"
            name="joined_date"
            value={formData.joined_date}
            onChange={handleChange}
            required
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
  );
};

export default EmployeeRegistrationForm;
