import { createSlice } from "@reduxjs/toolkit"

const PAYMENT_INITIAL_STATE = {
  subscriptionAmount: null,
  paymentType: "stripe",
  paymentDate: null,
  subscription_id: null,
}

const paymentSlice = createSlice({
  name: "payment",
  initialState: PAYMENT_INITIAL_STATE,
  reducers: {
    setSubscriptionAmount: (state, action) => {
      state.subscriptionAmount = action.payload
    },
    setPaymentType: (state, action) => {
      state.paymentType = action.payload
    },
    setPaymentDate: (state, action) => {
      state.paymentDate = action.payload
    },
    setSubscriptionId: (state, action) => {
      state.subscription_id = action.payload
    },
    clearPaymentDetails: (state) => {
      state.subscriptionAmount = null
      state.paymentType = null
      state.paymentDate = null
      state.subscription_id = null
    },
  },
})

export const {
  setSubscriptionAmount,
  setPaymentType,
  setPaymentDate,
  setSubscriptionId,
  clearPaymentDetails,
} = paymentSlice.actions
export const paymentReducer = paymentSlice.reducer
