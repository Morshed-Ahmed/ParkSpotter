import styled from "styled-components";

export const FormContainer = styled.div`
  width: 50%;
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const FormHeader = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

export const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;
  }
  textarea {
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
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const InputContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FullWidthInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
