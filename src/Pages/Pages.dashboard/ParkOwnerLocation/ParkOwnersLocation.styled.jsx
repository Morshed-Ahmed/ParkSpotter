import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #f5f5f7;
  min-height: 100vh;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

export const Input = styled.input`
  padding: 10px 15px;
  width: 15%;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #202123;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

export const SmallButton = styled(Button)`
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 99px;
`

export const MapContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 400px;
  }
`

export const Tooltip = styled.span`
  visibility: hidden;
  width: 140px;
  background-color: #fff;
  color: #aaa;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: 50%;
  right: 0%;
  margin-left: -70px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`

export const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`