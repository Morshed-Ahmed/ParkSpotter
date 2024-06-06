import styled from "styled-components"

export const Container = styled.div`
  color: #202123;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ddd;
  padding: 20px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`

export const FilterSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Select = styled.select`
  padding: 12px;
  font-size: 14px;
  border: 2px solid #ffffff;
  border-radius: 8px;
  background: #ffffff;
  color: #202123;
  width: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &::placeholder {
    color: #808080;
  }

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`

export const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 2px solid #ffffff;
  border-radius: 8px;
  background: #ffffff;
  color: #202123;
  width: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &::placeholder {
    color: #808080;
  }

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`

export const SalaryFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #202123;
  border-radius: 50%;
  width: 30px;
  height: 30px;
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
`
