import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiAlignJustify } from "react-icons/fi";
import { parkSpotterLogo } from "../../../assets/Logo/Logo";
import { IoIosCloseCircleOutline, IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSubscriptionAmount } from "../../../store/payment/payment.reducer";
import { MdDashboard, MdPhoneAndroid } from "react-icons/md";
import toast from "react-hot-toast";

const PrimaryColor = "#202123";
const SecondaryColor = "#ffffff";
const ComplementaryColor = "coral";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 5%;
  background-color: ${SecondaryColor};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 999;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  color: ${PrimaryColor};
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;

  img {
    width: 40px;
    margin-right: 10px;
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: ${({ isopen }) => (isopen === "true" ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${SecondaryColor};
    padding: 20px 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const MenuItem = styled(NavLink)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${PrimaryColor};
  transition: color 0.3s ease;

  &:hover {
    color: ${ComplementaryColor};
  }
`;

const ToggleButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    color: ${PrimaryColor};
    cursor: pointer;
  }
`;

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

const SignInLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const role = localStorage.getItem("role");

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

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

  // Logout
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
    <NavbarContainer>
      <NavLink to={"/"}>
        <Logo>
          <img src={parkSpotterLogo} alt="ParkSpotter Logo" />
          ParkSpotter
        </Logo>
      </NavLink>
      <ToggleButton onClick={toggleMenu}>
        <FiAlignJustify size={"25px"} />
      </ToggleButton>
      <Menu isopen={isOpen.toString()}>
        <div>
          {/* <button
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
          </button> */}
          <CustomModal isOpen={modalOpen} onClose={closeModal}>
            <SubscriptionCardsContainer>
              <SubscriptionCard onClick={() => handlePrice("$9.99")}>
                <Title>1 Month Plan</Title>
                <Description>Access to basic features for 1 month</Description>
                <Price>$9.99</Price>
              </SubscriptionCard>
              <SubscriptionCard onClick={() => handlePrice("$49.99")}>
                <Title>6 Month Plan</Title>
                <Description>Access to basic features for 6 months</Description>
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

        <div>
          {role == "customer" ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <a href="https://development-parkspotter-pwa.netlify.app/home">
                <button
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <MdPhoneAndroid /> Your App
                </button>
              </a>
              <button
                onClick={handleLogout}
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <IoIosLogOut /> Logout
              </button>
            </div>
          ) : (
            <>
              {role == "park_owner" || role == "employee" ? (
                <NavLink
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                  to={"/dashboard"}
                >
                  <MdDashboard />
                  <button style={{ fontWeight: "600" }}> Dashboard</button>
                </NavLink>
              ) : (
                <SignInLinkContainer>
                  <MenuItem to={"/login"}>LogIn</MenuItem>
                  <NavLink to={"/signup"}>
                    <button
                      style={{
                        fontWeight: "600",
                        backgroundColor: `${PrimaryColor}`,
                        padding: "8px 15px",
                        color: "white",
                        borderRadius: "29px",
                      }}
                    >
                      Signup 👋
                    </button>
                  </NavLink>
                  <NavLink
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    to={"/demoDashboard"}
                  >
                    <MdDashboard />
                    <button style={{ fontWeight: "600" }}>
                      Demo dashboard
                    </button>
                  </NavLink>
                </SignInLinkContainer>
              )}
            </>
          )}
        </div>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;

// export default Navbar;
