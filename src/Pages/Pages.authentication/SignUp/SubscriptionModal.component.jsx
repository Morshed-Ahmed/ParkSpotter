import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSubscriptionAmount } from "../../../store/payment/payment.reducer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ModalBackground = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 1200px;
  max-height: 80vh;
  padding: 40px;
  position: relative;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
`;

const SubscriptionCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const SubscriptionCard = styled.div`
  background: linear-gradient(135deg, #f0f0f0, #ffffff);
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 300px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const Price = styled.p`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const OriginalPrice = styled.div`
  font-size: 16px;
  color: #888;
  text-decoration: line-through;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const Highlight = styled.span`
  font-size: 16px;
  color: #d9534f;
  font-weight: bold;
  margin-top: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const Features = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  text-align: left;
`;

const Feature = styled.li`
  font-size: 14px;
  color: #444;
  margin-bottom: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  &::before {
    content: "✔";
    color: #0070c9;
    margin-right: 8px;
  }
`;

const SelectButton = styled.button`
  background-color: #0070c9;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  &:hover {
    background-color: #005bb5;
  }
`;

const SubscriptionModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/subscription_package/"
        );
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    if (isOpen) {
      fetchSubscriptions();
    }
  }, [isOpen]);

  const handlePrice = (priceNumeric) => {
    dispatch(setSubscriptionAmount(priceNumeric));
    const is_staff = localStorage.getItem("is_staff");
    if (!is_staff) {
      navigate("/payment");
    } else {
      onClose();
    }
  };

  return (
    <ModalBackground isModalOpen={isOpen} onClick={onClose}>
      <ModalContent isModalOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircleOutline size={"30"} />
        </CloseButton>
        <SubscriptionCardsContainer>
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              onClick={() => handlePrice(subscription.total_amount)}
            >
              <Title>{subscription.name}</Title>
              <Description>
                Access to all features for {subscription.duration_months} months
              </Description>
              <Price>{subscription.total_amount.toFixed(2)}tk</Price>
              <OriginalPrice>
                {parseFloat(subscription.price).toFixed(2)}tk
              </OriginalPrice>
              <Highlight>Save {subscription.discount}%</Highlight>
              <Features>
                <Feature>24/7 Customer Support</Feature>
                <Feature>Unlimited Access</Feature>
                <Feature>Regular Updates</Feature>
                <Feature>Exclusive Content</Feature>
              </Features>
              <SelectButton>Select</SelectButton>
            </SubscriptionCard>
          ))}
        </SubscriptionCardsContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default SubscriptionModal;
