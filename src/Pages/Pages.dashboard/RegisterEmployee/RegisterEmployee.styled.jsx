import styled from "styled-components"

export const FormContainer = styled.div`
  background-color: #fff;
  color: #202123;
  padding: 60px 80px;
  border-radius: 15px;
  max-width: 70%;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  text-align: center;
  font-size: 1.2em;
  color: coral;
  background-color: #fff;
  width: 24%;
  padding: 7px 10px;
  margin: 20px auto;
  border-radius: 55px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`

export const Input = styled.input`
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #333;
  color: #fff;
  font-size: 1em;

  &:focus {
    border-color: coral;
    outline: none;
  }

  &::placeholder {
    color: #bbb;
  }
`

export const Button = styled.button`
  background-color: coral;
  color: #ffffff;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 40px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  

  &:hover {
    background-color: green;
  }

  &:active {
    transform: scale(0.98);
  }
`