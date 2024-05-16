import styled from "styled-components"

export const Container = styled.div`
  width: 80%;
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
`

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;
  }

  input[type="submit"] {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    cursor: pointer;
  }

  p[role="alert"] {
    color: red;
    border: 1px solid red;
    padding: 10px;
    background: #fdede8;
    border-radius: 5px;
  }
`