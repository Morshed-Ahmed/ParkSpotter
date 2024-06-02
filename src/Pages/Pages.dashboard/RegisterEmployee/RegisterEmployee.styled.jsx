import styled from "styled-components";

export const FormContainer = styled.div`
  background-color: #fff;
  color: #202123;
  padding: 60px 80px;
  border-radius: 15px;
  max-width: 70%;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 1200px) {
    max-width: 80%;
    padding: 50px 70px;
  }

  @media (max-width: 992px) {
    max-width: 90%;
    padding: 40px 60px;
  }

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 30px 40px;
  }

  @media (max-width: 576px) {
    max-width: 100%;
    padding: 20px;
    margin: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

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

  @media (max-width: 992px) {
    font-size: 1.1em;
    width: 30%;
  }

  @media (max-width: 768px) {
    font-size: 1em;
    width: 40%;
  }

  @media (max-width: 576px) {
    font-size: 0.9em;
    width: 50%;
  }
`;


export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 2px solid #ccc;
  font-size: 1em;

  &:focus {
    border: 2px solid #202123;
    outline: none;
  }

  &::placeholder {
    color: #bbb;
  }

  @media (max-width: 992px) {
    padding: 12px;
    font-size: 0.9em;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.8em;
  }

  @media (max-width: 576px) {
    padding: 8px;
    font-size: 0.7em;
  }
`;

export const DateInput = styled(Input)`
  &::placeholder {
    color: #bbb;
  }
`;
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

  @media (max-width: 992px) {
    width: 60%;
    padding: 12px;
  }

  @media (max-width: 768px) {
    width: 70%;
    padding: 10px;
  }

  @media (max-width: 576px) {
    width: 80%;
    padding: 8px;
  }
`;
