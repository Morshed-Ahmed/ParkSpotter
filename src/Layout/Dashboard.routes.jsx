import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
import UserProfile from "../Pages/Pages.UserProfile/UserProfile/UserProfile";
import toast from "react-hot-toast";

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

  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    fetch("https://parkspotter-backened.onrender.com/accounts/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Assuming you're using Token based auth
      },
    })
      .then((res) => {
        // console.log(res);
        res.json();
      })
      .then((data) => {
        // console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        navigate("/login");
        toast.success("Log out successful");
      })
      .catch((error) => {
        // console.error("Error logging out:", error);
      });
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
            {/* <DropdownItem>Profile</DropdownItem> */}
            <UserProfile />
            <DropdownItem onClick={handleLogout}>Log Out</DropdownItem>
          </DropdownContent>
        </DropdownContainer>
        {/* Profile Dropdown End */}
      </Header>
      <Content>
        <MenuContainer open={menuOpen}>
          <MenuItem to={"/"} exact activeClassName="active">Home</MenuItem>
          <MenuItem to={"/dashboard"} end activeClassName="active">Overview</MenuItem>
          <MenuItem to={"/dashboard/CreateParkingTicket"} activeClassName="active">
            Create Parking Ticket
          </MenuItem>
          <MenuItem to={"/dashboard/AvailableParkingSlot"} activeClassName="active">
            Available Slots
          </MenuItem>
          <MenuItem to={"/dashboard/UnpaidTickets"} activeClassName="active">Unpaid tickets</MenuItem>
          <MenuItem to={"/dashboard/RegisterEmployee"} activeClassName="active">
            Register Employee
          </MenuItem>
          <MenuItem to={"/dashboard/TicketPayment"} activeClassName="active">Ticket Payment</MenuItem>
          <MenuItem to={"/dashboard/EmployeeList"} activeClassName="active">Employee List</MenuItem>
        </MenuContainer>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
