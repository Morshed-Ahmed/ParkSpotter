import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllStates } from "../../store/registration/registration.selector"
import { selectSubscriptionAmount } from "../../store/payment/payment.selector"
import { setPaymentType } from "../../store/payment/payment.reducer"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import {
  StyledButton,
  StyledForm,
  StyledHeading,
  StyledLabel,
  StyledPaymentForm,
  StyledPaymentFormContainer,
} from "./PaymentForm.style"
import { registerUser } from "../../Utils/Firebase/firebase"

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const dispatch = useDispatch()
  const amount = useSelector(selectSubscriptionAmount)
  const navigate = useNavigate()

  // Get all registration data using the selectRegistrationSlice selector
  const registrationData = useSelector(selectAllStates)

  // Dispatch an action to set the payment type
  dispatch(setPaymentType("stripe"))

  // Define the payment handler function
  const paymentHandler = async (e, data) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    // Set processing payment state to true
    setIsProcessingPayment(true)

    // Fetch the payment intent
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json())

    // Extract client secret from the response
    const {
      paymentIntent: { client_secret },
    } = response

    // Confirm card payment with stripe
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: registrationData.username || "Guest",
          address: {
            line1: registrationData.address || "N/A",
          },
          phone: registrationData.mobile_no || "N/A",
          email: registrationData.email || "N/A",
        },
      },
    })

    // Set processing payment state to false
    setIsProcessingPayment(false)

    // Handle payment result
    if (paymentResult.error) {
      alert(`Error: ${paymentResult.error.message}`)
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        // Set user type
        registrationData.userType = "parkOwner"

        // Register the user
        try {
          await registerUser(registrationData)
          toast.success("User registered successfully")
          navigate("/login")
        } catch (error) {
          console.error("Error registering user:", error)
          toast.error("Error registering user")
        }

        // Payment success alert
        alert("Payment Success")
      }
    }
  }

  // Render the component
  return (
    <StyledPaymentFormContainer>
      <StyledPaymentForm>
        <StyledHeading>Secure Payment</StyledHeading>
        <StyledForm onSubmit={(e) => paymentHandler(e, registrationData)}>
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
