import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  setSubscriptionAmount,
  setSubscriptionId,
} from "../../../../store/payment/payment.reducer"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { IoIosCloseCircleOutline } from "react-icons/io"
import {
  CloseButton,
  Description,
  Feature,
  Features,
  Highlight,
  ModalBackground,
  ModalContent,
  OriginalPrice,
  Price,
  SelectButton,
  SubscriptionCard,
  SubscriptionCardsContainer,
  Title,
} from "./SubscriptionModal.styled"

const SubscriptionModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/subscription_package/"
        )
        const data = await response.json()
        setSubscriptions(data)
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      }
    }

    if (isOpen) {
      fetchSubscriptions()
    }
  }, [isOpen])

  const handlePrice = (priceNumeric, id) => {
    dispatch(setSubscriptionAmount(priceNumeric))
    dispatch(setSubscriptionId(id))
    console.log(id)
    const is_staff = localStorage.getItem("is_staff")
    if (!is_staff) {
      navigate("/payment")
    } else {
      onClose()
    }
  }

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
              onClick={() =>
                handlePrice(subscription.total_amount, subscription.id)
              }
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
  )
}

export default SubscriptionModal
