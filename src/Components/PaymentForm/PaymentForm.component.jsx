import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import styled from "styled-components"
import { useState } from "react"

const StyledPaymentFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const StyledPaymentForm = styled.div`
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`

const StyledHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 1rem;
  color: #202123;
  text-align: center;
  margin-bottom: 1.5rem;
`

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`

const StyledLabel = styled.label`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
`

const StyledButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #202123;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(32, 33, 35, 0.2);
  }
`

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const amount = 100
  const currentUser = {
    userName: "rahat test",
  }
  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessingPayment(true)
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json())

    const {
      paymentIntent: { client_secret },
    } = response

    console.log(client_secret)
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.userName : "Guest",
        },
      },
    })

    setIsProcessingPayment(false)

    if (paymentResult.error) {
      alert(`Error: ${paymentResult.error.message}`)
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Success")
      }
    }
  }

  return (
    <StyledPaymentFormContainer>
      <StyledPaymentForm>
        <StyledHeading>Secure Payment</StyledHeading>
        <StyledForm onSubmit={paymentHandler}>
          <div>
            <StyledLabel htmlFor="card-element">
              Credit Card Information
            </StyledLabel>
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: "1rem",
                    color: "#202123",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#e53e3e",
                  },
                },
              }}
              className="w-full p-3 border rounded-md shadow-sm bg-white"
            />
          </div>
          <div>
            <StyledButton disabled={isProcessingPayment}>
              {isProcessingPayment ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Pay Now"
              )}
            </StyledButton>
          </div>
        </StyledForm>
      </StyledPaymentForm>
    </StyledPaymentFormContainer>
  )
}

export default PaymentForm
