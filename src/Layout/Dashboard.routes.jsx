import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import {
  Container,
  Content,
  Header,
  MenuButton,
  MenuContainer,
  MenuIcon,
  MenuItem,
  OutletWrapper,
} from "./DashBoardRoutes.styles"
import {
  DropdownContainer,
  DropdownContent,
  DropdownItem,
  CircularImageContainer,
  Image,
} from "./DashBoardRoutes.styles"
import UserProfile from "../Pages/Pages.UserProfile/UserProfile/UserProfile"
import { useSelector } from "react-redux"
import { selectUserType } from "../store/user/user.selector"
import { logoutUser } from "../Utils/Firebase/firebase"
import toast from "react-hot-toast"

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  /* Profile Dropdown start */
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      toast.success("log out success")
      navigate("/login") // Navigate to the login page after logout
      
    } catch (error) {
      toast.error("Error logging out:", error.message)
    }
  }
  /* Profile Dropdown end */

  const userType = useSelector(selectUserType) // Fetch userType directly from Redux store
  console.log(userType)
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
          <MenuItem to={"/"}>Home</MenuItem>
          <MenuItem to={"/dashboard/CreateParkingTicket"}>
            Create Parking Ticket
          </MenuItem>
          <MenuItem to={"/dashboard/AvailableParkingSlot"}>
            Available Parking Slot
          </MenuItem>
          <MenuItem to={"/dashboard/UnpaidTickets"}>Unpaid tickets</MenuItem>
          {userType === "parkOwner" && (
            <MenuItem to={"/dashboard/RegisterEmployee"}>
              Register Employee
            </MenuItem>
          )}
          <MenuItem to={"/dashboard/test"}>
            test
          </MenuItem>
        </MenuContainer>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </Content>
    </Container>
  )
}

export default Dashboard
