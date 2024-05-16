import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiAlignJustify } from "react-icons/fi";
import { parkSpotterLogo } from "../../../assets/Logo/Logo";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 91%;
  margin: auto;
  height: 80px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: bold;
    font-size: 1.94rem;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 45px;

  @media (max-width: 768px) {
    display: ${({ isopen }) => (isopen === "true" ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 12%;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const MenuItem = styled(NavLink)`
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  line-height: 14px;
  color: black;
`;

const ToggleButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Subscription Modal style start
import { IoIosCloseCircleOutline } from "react-icons/io";
import UserProfile from "../../Pages.UserProfile/UserProfile/UserProfile";

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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 80%;
  ${"" /* height: 80%; */}
  max-width: 800px;
  ${"" /* max-height: 600px; */}
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
  background-color: white;
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
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;
// Subscription Modal style end
// Subscription Modal start
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
// Subscription Modal end

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const user_id = localStorage.getItem("user_id");

  // Subscription Modal start
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handlePrice = (price) => {
    console.log(`Price clicked: ${price}`);
  };
  // Subscription Modal end
  return (
    <NavbarContainer>
      <Logo>
        <img style={{ width: "50px" }} src={parkSpotterLogo} alt="" />
        <h1>ParkSpotter</h1>
      </Logo>
      <ToggleButton onClick={toggleMenu}>
        <FiAlignJustify size={"25px"} cursor={"pointer"} />
      </ToggleButton>
      <Menu isopen={isOpen.toString()}>
        {/* Subscription Modal Content start */}
        <div>
          <button onClick={openModal}>Subscription</button>
          <CustomModal isOpen={modalOpen} onClose={closeModal}>
            <div>
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
            </div>
          </CustomModal>
        </div>
        {/* Subscription Modal Content start */}
        <MenuItem to={"/login"}>LogIn</MenuItem>
        <div>
          {user_id ? (
            <>
              <NavLink to={"/dashboard"}>
                <button
                  style={{
                    padding: "15px 30px ",
                    fontSize: "18px",
                    borderRadius: "18px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Dashboard
                </button>
              </NavLink>



            </>
          ) : (
            <>
              <NavLink to={"/signup"}>
                <button
                  style={{
                    padding: "15px 30px ",
                    fontSize: "18px",
                    borderRadius: "18px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Signup 👋
                </button>
              </NavLink>

              <NavLink to={""}>
                <button
                  style={{
                    padding: "15px 30px ",
                    fontSize: "18px",
                    borderRadius: "18px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <UserProfile />
                </button>
              </NavLink>
            </>
          )}
        </div>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
