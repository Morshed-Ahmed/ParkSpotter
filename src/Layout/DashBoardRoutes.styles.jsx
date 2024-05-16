import styled from "styled-components";
import { NavLink } from "react-router-dom";
import * as css from "../Utils/Styles/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${css.primaryColor};
  color: ${css.secondaryColor};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const MenuButton = styled.div`
  cursor: pointer;
`;

export const MenuIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: fill 0.2s ease;

  &:hover {
    fill: ${css.complimentaryColor};
  }
`;

export const MenuContainer = styled.div`
  width: ${(props) => (props.open ? "240px" : "0px")};
  transition: width 0.3s ease;
  border-right: 1px solid #ccc;
  overflow: hidden;

  @media (max-width: 768px) {
    width: ${(props) => (props.open ? "200px" : "0px")};
  }
`;

export const MenuItem = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 1rem;
  color: ${css.secondaryColor};
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${css.complimentaryColor};
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
`;

export const OutletWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${css.secondaryColor};
  color: ${css.primaryColor};
`;

// Profile Dropdown style Start
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const CircularImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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
`;

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
`;
// Profile Dropdown style End
