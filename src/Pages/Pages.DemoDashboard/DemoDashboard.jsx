import { NavLink, Outlet } from "react-router-dom";
import {
  CircularImageContainer,
  Container,
  Content,
  DropdownContainer,
  DropdownContent,
  DropdownItem,
  Header,
  Image,
  MenuButton,
  MenuContainer,
  MenuIcon,
  MenuItem,
  OutletWrapper,
  SubscribeButton,
} from "./DemoDashboard.styles";
import { useState } from "react";
import toast from "react-hot-toast";

const DemoDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /* Profile Dropdown start */
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  /* Profile Dropdown end */

  const handleIsOwner = () => {
    toast(
      (t) => (
        <span>
          Please{" "}
          <b>
            <button
              style={{
                border: "1px solid #d5d2c9",
                borderRadius: "15px",
                padding: "5px",
                margin: "5px",
              }}
            >
              Subscribe
            </button>
          </b>
          <button
            style={{
              background: "#d5d2c9",
              padding: "5px",
              margin: "5px",
              borderRadius: "2px",
            }}
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </span>
      ),
      {
        duration: 10000,
      }
    );
  };
  return (
    <Container>
      <Header>
        <MenuButton onClick={toggleMenu}>
          <MenuIcon viewBox="0 0 24 24">
            <path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z" />
          </MenuIcon>
        </MenuButton>
        <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
          <span>ParkSpotter</span>
        </div>
        {/* Profile Dropdown start */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <NavLink to={"/login"}>Login</NavLink>
          <SubscribeButton to={"/signup"}>Subscribe</SubscribeButton>

          <DropdownContainer>
            <CircularImageContainer onClick={toggleDropdown}>
              <Image
                src={
                  "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=sph"
                }
                alt={"Profile image"}
              />
            </CircularImageContainer>
            <DropdownContent isOpen={isOpen}>
              <DropdownItem onClick={handleIsOwner}>Profile</DropdownItem>
              <DropdownItem onClick={handleIsOwner}>Log Out</DropdownItem>
            </DropdownContent>
          </DropdownContainer>
        </div>
        {/* Profile Dropdown End */}
      </Header>
      <Content>
        <MenuContainer open={menuOpen}>
          <MenuItem to={"/"}>Home</MenuItem>
          <MenuItem onClick={handleIsOwner}>Create Parking Ticket</MenuItem>
          <MenuItem onClick={handleIsOwner}>Available Parking Slot</MenuItem>
          <MenuItem onClick={handleIsOwner}>Unpaid tickets</MenuItem>
          <MenuItem onClick={handleIsOwner}>Register Employee</MenuItem>
          <MenuItem onClick={handleIsOwner}>Ticket Payment</MenuItem>
          <MenuItem onClick={handleIsOwner}>Employee List</MenuItem>
          <MenuItem onClick={handleIsOwner}>Statistics</MenuItem>
        </MenuContainer>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </Content>
    </Container>
  );
};

export default DemoDashboard;
