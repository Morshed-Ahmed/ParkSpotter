import { useState } from "react";
import styled from "styled-components";
import { db } from "../../../../../Utils/Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const Container = styled.div`
  width: 85%;
  margin: auto;
  background-image: url("https://parkplus.io/_next/image?url=%2Fimg%2Fcontact-patterns.png&w=1920&q=75");
  background-color: #f6f7fb;
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 70px;
  border-radius: 30px;
  margin-top: 20px;
  filter: grayscale(100%);

  @media (max-width: 768px) {
    padding: 20px;
    height: 650px;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const BusinessQueryBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const BusinessQueryTitleBox = styled.div`
  flex: 1;
  h1 {
    font-size: 56px;
    line-height: 60px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #202123;
  }

  p {
    font-size: 18px;
    line-height: 26px;
    font-weight: 700;
    color: #a4a4a6;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
      line-height: 32px;
    }
    p {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

const BusinessQueryInputBox = styled.div`
  flex: 1;

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    color: #202123;
    margin-bottom: 10px;
  }

  button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background-color: #202123;
    color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: coral;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BusinessQuery = () => {
  const [formData, setFormData] = useState({
    selectInput: "",
    phone: "",
    emailInput: "",
    textareaInput: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^\+880\d{3}\d{3}\d{4}$/;
    return phonePattern.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.selectInput || !formData.phone || !formData.emailInput || !formData.textareaInput) {
      alert("All fields are required");
      return;
    }

    if (!validatePhoneNumber(formData.phone)) {
      alert("Phone number must be in the format: +880XXXXXXXXXX");
      return;
    }

    try {
      await addDoc(collection(db, "businessQueries"), formData);
      console.log("Form data submitted: ", formData);
      alert("Form submitted successfully!");

      // Optionally reset the form
      setFormData({
        selectInput: "",
        phone: "",
        emailInput: "",
        textareaInput: "",
      });
    } catch (error) {
      console.error("Error submitting form data: ", error);
    }
  };

  return (
    <Container>
      <BusinessQueryBox>
        <BusinessQueryTitleBox>
          <h1>Got a business query?</h1>
          <p>
            Just leave your email with us and we’ll get back to you shortly!
          </p>
        </BusinessQueryTitleBox>
        <BusinessQueryInputBox>
          <form onSubmit={handleSubmit}>
            <label htmlFor="selectInput">Select your query:</label>
            <select
              id="selectInput"
              name="selectInput"
              value={formData.selectInput}
              onChange={handleChange}
            >
              <option value="">Please select your query</option>
              <option value="dashboard">ParkOwner Dashboard Issues</option>
              <option value="appSupport">Mobile App Support</option>
              <option value="feedback">Feedback or Suggestions</option>
              <option value="other">Other Queries</option>
            </select>

            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Format: +880XXXXXXXXXX"
            />

            <label htmlFor="emailInput">Email:</label>
            <input
              type="email"
              id="emailInput"
              name="emailInput"
              value={formData.emailInput}
              onChange={handleChange}
            />

            <label htmlFor="textareaInput">Message:</label>
            <textarea
              id="textareaInput"
              name="textareaInput"
              value={formData.textareaInput}
              onChange={handleChange}
            />

            <button type="submit">Submit</button>
          </form>
        </BusinessQueryInputBox>
      </BusinessQueryBox>
    </Container>
  );
};

export default BusinessQuery;
