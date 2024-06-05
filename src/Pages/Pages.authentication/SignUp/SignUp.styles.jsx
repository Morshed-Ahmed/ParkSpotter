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


export const TabContainer = styled.div`
  display: flex;
  ${"" /* border-bottom: 2px solid #ccc; */}
`;

export const Tab = styled.button`
  background: ${(props) => (props.active ? "#fff" : "#eee")};
  border: none;
  border-bottom: ${(props) =>
    props.active ? "2px solid #007bff" : "2px solid transparent"};
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
  transition: background 0.3s;

  &:hover {
    background: #ddd;
  }
`;

export const TabContent = styled.div`
  padding: 20px;
  ${"" /* border: 1px solid #ccc; */}
  ${"" /* border-top: none; */}
`;

export const PrimaryColor = "#202123";
export const SecondaryColor = "#ffffff";
export const ComplementaryColor = "coral";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
  visibility: ${(props) => (props.isModalOpen ? "visible" : "hidden")};
`;

export const ModalContent = styled.div`
  background-color: ${SecondaryColor};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 800px;
  position: relative;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(${(props) => (props.isModalOpen ? "0" : "-50px")});
  opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${PrimaryColor};
`;

export const SubscriptionCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const SubscriptionCard = styled.div`
  cursor: pointer;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${SecondaryColor};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${PrimaryColor};
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

export const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  color: ${ComplementaryColor};
`;
