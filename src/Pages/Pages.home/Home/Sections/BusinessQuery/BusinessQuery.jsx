import { useState } from "react"
import styled from "styled-components"

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
`

const BusinessQueryBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

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
`

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
`

const BusinessQuery = () => {
  const [formData, setFormData] = useState({
    selectInput: "",
    phone: "",
    emailInput: "",
    textareaInput: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value
    if (name === "phone") {
      formattedValue = value.replace(
        /^(\+?880)(\d{3})(\d{3})(\d{4})$/,
        "$1$2 $3 $4"
      )
    }
    setFormData({ ...formData, [name]: formattedValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

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
            <label htmlFor="selectInput">Select:</label>
            <select
              id="selectInput"
              name="selectInput"
              value={formData.selectInput}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
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
  )
}

export default BusinessQuery
