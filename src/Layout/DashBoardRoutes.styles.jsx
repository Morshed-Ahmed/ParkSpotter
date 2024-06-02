import styled from "styled-components"
import { NavLink } from "react-router-dom"
import * as css from "../Utils/Styles/styles"

// Dashboard starts


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${css.secondaryColor};
  color: ${css.primaryColor};
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #fff;
  background-color: #405189;
  // border-bottom: 4px solid #fff;
`

export const MenuButton = styled.div`
  cursor: pointer;
  
`

export const MenuIcon = styled.svg`
  width: 30px;
  height: 30px;
  fill: currentColor;
  transition: fill 0.2s ease;

  &:hover {
    fill: ${css.complimentaryColor};
  }
`

export const MenuContainer = styled.div`
  width: ${(props) => (props.open ? "240px" : "0px")};
  transition: width 0.3s ease;
  border-right: 1px solid #202123;
  ${"" /* overflow: hidden; */}
  background-color: #405189;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-top: 4px solid #fff;
  ${"" /* height: 89vh;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-color: #ddd transparent;
  scrollbar-width: thin;
  scrollbar-border: 1px solid red; */
  }

  ${"" /* width: 100%; */}
  height: 100%;
  overflow: auto;

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 50px; /* Rounded corners for the track */
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 50px; /* Rounded corners for the thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Firefox scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  /* Apply rounded corners in Firefox */
  & {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 15;
    left: 0;
    z-index: 999;
  }
`

export const MenuItem = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 12px;
  color: ${css.secondaryColor};
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin: 10px 15px 10px 0;
  border-top-right-radius: 99px;
  border-bottom-right-radius: 99px;

  &:hover {
    background-color: #fff;
    color: #202123;
    font-weight: bold;
  }

  &.active {
    background-color: #fff; 
    color: #202123; 
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`
export const OutletWrapper = styled.div`
  flex: 1;
  background-color: ${css.secondaryColor};
  color: ${css.primaryColor};
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  min-height: calc(100vh - 64px);
`

// Dashboard ends

// Profile Dropdown style Start
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const CircularImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 1px;
  border-radius: 10px;
  @media (max-width: 768px) {
    min-width: 120px;
  }
`

export const DropdownItem = styled.button`
  color: black;
  padding: 10px 20px;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: #ddd;
    border-radius: 10px;
  }
`
// Profile Dropdown style End
