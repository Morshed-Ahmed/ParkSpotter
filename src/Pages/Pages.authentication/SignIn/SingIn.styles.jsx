import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: auto;
  margin-top: 100px;
`;

export const Header = styled.h1`
  color: #202123;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }

  input[type="submit"] {
    background-color: #202123;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3a3b3c;
    }
  }

  p {
    margin-top: 10px;
    color: #202123;
  }

  a {
    color: #1e90ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  [role="alert"] {
    color: red;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
  }
`;

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #202123;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  align-self: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
