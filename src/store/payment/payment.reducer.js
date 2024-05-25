import { createSlice } from "@reduxjs/toolkit"

const PAYMENT_INITIAL_STATE = {
  subscriptionAmount: null,
  paymentType: null,
  paymentDate: null,
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
    clearPaymentDetails: (state) => {
      state.subscriptionAmount = null
      state.paymentType = null
      state.paymentDate = null
    },
  },
})

export const {
  setSubscriptionAmount,
  setPaymentType,
  setPaymentDate,
  clearPaymentDetails,
} = paymentSlice.actions
export const paymentReducer = paymentSlice.reducer
