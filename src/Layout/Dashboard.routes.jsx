import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Container,
  Content,
  Header,
  MenuButton,
  MenuContainer,
  MenuIcon,
  MenuItem,
  OutletWrapper,
} from "./DashBoardRoutes.styles";
import {
  DropdownContainer,
  DropdownContent,
  DropdownItem,
  CircularImageContainer,
  Image,
} from "./DashBoardRoutes.styles";

const Dashboard = () => {
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

  return (
    <Container>
      <Header>
        <MenuButton onClick={toggleMenu}>
          <MenuIcon viewBox="0 0 24 24">
            <path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z" />
          </MenuIcon>
        </MenuButton>
        <div style={{ fontWeight: "bold" }}>ParkSpotter Dashboard</div>
        {/* Profile Dropdown start */}
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
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Log Out</DropdownItem>
          </DropdownContent>
        </DropdownContainer>
        {/* Profile Dropdown End */}
      </Header>
      <Content>
        <MenuContainer open={menuOpen}>
          <MenuItem to={"/"}>Home</MenuItem>
          <MenuItem to={"/dashboard/CreateParkingTicket"}>
            Create Parking Ticket
          </MenuItem>
          <MenuItem to={"/dashboard/AvailableParkingSlot"}>
            Available Parking Slot
          </MenuItem>
          <MenuItem to={"/dashboard/UnpaidTickets"}>Unpaid tickets</MenuItem>
        </MenuContainer>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
