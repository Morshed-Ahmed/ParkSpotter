import styled from "styled-components"
import { Link } from "react-router-dom"

export const Container = styled.div`
  background-color: #ffffff;
  color: #202123;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FilterContainer = styled.div`
  border: 2px solid #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
  justify-content: center;
  background: #405189;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px 15px;

  @media (max-width: 768px) {
    display: none;
  }
`

export const MobileFilterContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  background-color: #405189;
  padding: 35px;
  border-radius: 0;
  border: 0;
  @media (max-width: 768px) {
    display: flex;
  }
`

export const MobileFilterInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Select = styled.select`
  padding: 8px;
  font-size: 13px;
  border: 3px solid #202123;
  border-radius: 4px;
  outline: none;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`

export const Input = styled.input`
  padding: 8px;
  font-size: 13px;
  border: 3px solid #202123;
  border-radius: 4px;
  outline: none;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`

export const ChartContainer = styled.div`
  width: 100%;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #f3f3f9;
`

export const DashBoardOverViewContainer = styled.div`
  background-color: #f3f3f9;
  padding: 40px 20px;
  width: 100%;
`
export const DashBoardOverViewTopSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const DashBoardOverViewContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`
export const DashBoardOverViewContainerHeader = styled.h1`
  font-size: 22px;
  font-weight: blod;
  color: #495057;
  margin-bottom: 10px;
`
export const DashBoardOverViewContainerBody = styled.h1`
  font-size: 16px;
  font-weight: blod;
  margin-bottom: 20px;
  color: #878a99;
  @media (max-width: 768px) {
    text-align: center;
  }
`

export const TopSectionDateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const TopSectionDateBox = styled.div`
  color: #202123;
  padding: 10px 15px;
  background-color: #fff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 14px;
`
export const TopSectionDateIcon = styled.div`
  background-color: #405189;
  padding: 10px 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  @media (max-width: 768px) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    row-gap: 20px;
    margin-bottom: 40px;
  }
`

export const Card = styled.div`
  width: 24%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #fff;
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const CardTitle = styled.p`
  color: #777;
  font-size: 14px;
`

export const CardValue = styled.h2`
  font-weight: bold;
  font-size: 22px;
  color: #404143;
  display: flex;
  align-items: baseline;
  flex-direction: row;
`
export const CardFooter = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`
export const CardFooterText = styled(Link)`
  font-weight: bold;
  color: #333;
  font-size: 14px;
`

export const CardFooterTextUnderLine = styled.hr`
  color: #0000cf;
  border: 1px solid #87cefa;
`
export const CardFooterIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #daf4f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`

export const CardFooterIconEmployee = styled(CardFooterIcon)`
  background-color: #fef4e4;
`
export const CardFooterIconRevenue = styled(CardFooterIcon)`
  background-color: #daf4f0;
`
export const CardFooterIconTickets = styled(CardFooterIcon)`
  background-color: #dff0fa;
`
export const CardFooterIconBookings = styled(CardFooterIcon)`
  background-color: #e2e5ed;
`
