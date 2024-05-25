import { Link } from "react-router-dom";
import styled from "styled-components";

export const FormContainer = styled.div`
  width: 60%;
  margin: auto;
  border-radius: 10px;
  padding: 20px 40px;

  @media (max-width: 768px) {
    width: 100%;
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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InputContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FullWidthInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Container = styled.div`
  color: #202123;
  background-color: #fff;
  ${"" /* padding: 20px; */}
`;

export const HomeButton = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: #202123;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const StyledFormContainer = styled(FormContainer)`
  background-color: #fff;
  color: #202123;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

export const StyledFormHeader = styled(FormHeader)`
  font-size: 1.5em;
  margin: 20px auto 40px auto;
  width: 60%;
  color: #202123;
  font-weight: bold;
  padding: 7px 14px;
  border-radius: 30px;
`;

export const StyledFormBody = styled(FormBody)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

export const StyledTextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  resize: none;
`;

export const SubmitButton = styled(StyledInput)`
  background-color: #202123;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
`;

export const AlertMessage = styled.p`
  color: coral;
`;

export const LoginLink = styled(Link)`
  color: #1e90ff;
  font-weight: normal;
  font-size: 1.05em;
`;
