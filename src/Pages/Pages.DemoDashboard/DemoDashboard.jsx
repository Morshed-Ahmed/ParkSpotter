import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSubscriptionAmount } from "../../store/payment/payment.reducer";

const PrimaryColor = "#202123";
const SecondaryColor = "#ffffff";
const ComplementaryColor = "coral";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
  visibility: ${(props) => (props.isModalOpen ? "visible" : "hidden")};
`;

const ModalContent = styled.div`
  background-color: ${SecondaryColor};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 800px;
  position: relative;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(${(props) => (props.isModalOpen ? "0" : "-50px")});
  opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${PrimaryColor};
`;

const SubscriptionCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const SubscriptionCard = styled.div`
  cursor: pointer;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${SecondaryColor};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${PrimaryColor};
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  color: ${ComplementaryColor};
`;

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <ModalBackground isModalOpen={isOpen} onClick={onClose}>
      <ModalContent isModalOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircleOutline size={"30"} />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

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

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePrice = (priceString) => {
    const priceNumeric = parseFloat(priceString.replace("$", ""));
    dispatch(setSubscriptionAmount(priceNumeric));
    const is_staff = localStorage.getItem("is_staff");
    if (!is_staff) {
      navigate("/signup");
    } else {
      setModalOpen(false);
      navigate("/payment");
    }
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
          {/* <SubscribeButton to={"/signup"}>Subscribe</SubscribeButton> */}

          <div>
            <button
              style={{
                fontWeight: "600",
                backgroundColor: `${PrimaryColor}`,
                padding: "8px 15px",
                color: "white",
                borderRadius: "29px",
              }}
              onClick={openModal}
            >
              Subscribe
            </button>
            <CustomModal isOpen={modalOpen} onClose={closeModal}>
              <SubscriptionCardsContainer>
                <SubscriptionCard onClick={() => handlePrice("$9.99")}>
                  <Title>1 Month Plan</Title>
                  <Description>
                    Access to basic features for 1 month
                  </Description>
                  <Price>$9.99</Price>
                </SubscriptionCard>
                <SubscriptionCard onClick={() => handlePrice("$49.99")}>
                  <Title>6 Month Plan</Title>
                  <Description>
                    Access to basic features for 6 months
                  </Description>
                  <Price>$49.99</Price>
                </SubscriptionCard>
                <SubscriptionCard onClick={() => handlePrice("$89.99")}>
                  <Title>1 Year Plan</Title>
                  <Description>Access to basic features for 1 year</Description>
                  <Price>$89.99</Price>
                </SubscriptionCard>
              </SubscriptionCardsContainer>
            </CustomModal>
          </div>
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
