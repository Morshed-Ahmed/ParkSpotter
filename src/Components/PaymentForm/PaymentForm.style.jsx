import styled from "styled-components"

export const PaymentFormContainer = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FormContainer = styled.form`
  height: 100px;
  width: 100%;
`

export const StyledPaymentFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export const StyledPaymentForm = styled.div`
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`

export const StyledHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 1rem;
  color: #202123;
  text-align: center;
  margin-bottom: 1.5rem;
`

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`

export const StyledLabel = styled.label`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
`

export const StyledButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #202123;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(32, 33, 35, 0.2);
  }
`