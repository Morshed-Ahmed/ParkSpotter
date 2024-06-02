import styled from "styled-components"

export const Container = styled.div`
  background-color: #fff;
  color: #202123;
  padding: 60px;
  border-radius: 15px;
  max-width: 50%;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
    max-width: 95%;
    margin: 20px auto;
  }
  @media only screen and (min-width: 768px) {
    max-width: 90%;
    margin: 20px auto;
  }
  @media only screen and (min-width: 992px) {
    max-width: 70%;
    margin: 20px auto;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 50%;
    margin: 20px auto;
  }
`

export const Title = styled.h2`
  color: coral;
  background-color: #fff;
  margin: 20px auto;
  text-align: center;
  width: 18%;
  border-radius: 35px;
  font-size: 1.2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 5px 7px;

  @media (max-width: 768px) {
    width: 50%;
  }
  @media only screen and (min-width: 768px) {
    width: 32%;
  }
`
export const FormGroup = styled.div`
  margin-bottom: 20px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 5px;
  color: #202123;
  border: 2px solid #ddd;
`

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  color: #202123;
  border: 2px solid #ddd;
`

export const Button = styled.button`
  width: contain;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  &:hover {
    background-color: #45a049;
  }
`

export const TotalAmount = styled.div`
  margin-top: 20px;
  font-size: 18px;
`

export const WarningMessage = styled.div`
  margin-top: 20px;
  color: #ff0000;

  span {
    font-weight: bold;
  }
`
