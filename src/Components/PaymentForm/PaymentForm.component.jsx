import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectAddress,
  selectArea,
  selectCapacity,
  selectConfirmPassword,
  selectEmail,
  selectFirstName,
  selectLastName,
  selectMobileNo,
  selectPassword,
  selectSlotSize,
  selectUsername,
} from "../../store/registration/registration.selector"
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

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const dispatch = useDispatch()
  const amount = useSelector(selectSubscriptionAmount)
  const navigate = useNavigate()

  const currentUser = {
    userName: useSelector(selectUsername),
    phone: useSelector(selectMobileNo),
    email: useSelector(selectEmail),
    address: useSelector(selectAddress),
  }

  dispatch(setPaymentType("stripe"))

  const data = {}
  data.address = useSelector(selectAddress)
  data.amount = useSelector(selectSubscriptionAmount)
  data.area = useSelector(selectArea)
  data.capacity = useSelector(selectCapacity)
  data.confirm_password = useSelector(selectConfirmPassword)
  data.email = useSelector(selectEmail)
  data.first_name = useSelector(selectFirstName)
  data.last_name = useSelector(selectLastName)
  data.mobile_no = useSelector(selectMobileNo)
  data.nid_card_no = 12345678901
  data.password = useSelector(selectPassword)
  data.payment_date = "2024-05-11"
  data.payment_method = "stripe"
  data.slot_size = useSelector(selectSlotSize)
  data.username = useSelector(selectUsername)

  const paymentHandler = async (e, data) => {
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

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.userName : "Guest",
          address: {
            line1: currentUser ? currentUser.address : "N/A",
          },
          phone: currentUser ? currentUser.phone : "N/A",
          email: currentUser ? currentUser.email : "N/A",
        },
      },
    })

    setIsProcessingPayment(false)

    if (paymentResult.error) {
      alert(`Error: ${paymentResult.error.message}`)
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/register/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => {
            if (!response.ok) {
              console.error("Error:")
            }
            return response.json()
          })
          .then((data) => {
            toast.success(data)
            navigate("/login")
          })
          .catch((error) => {
            console.error("Error:", error)
          })
        console.log(response)
        alert("Payment Success")
      }
    }
  }

  return (
    <StyledPaymentFormContainer>
      <StyledPaymentForm>
        <StyledHeading>Secure Payment</StyledHeading>
        <StyledForm onSubmit={(e) => paymentHandler(e, data)}>
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

// comment
