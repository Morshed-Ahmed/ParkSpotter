import { combineReducers } from "@reduxjs/toolkit"
import { userReducer } from "../store/user/user.reducer"
import { registrationReducer } from "./registration/registration.reducer"
import { paymentReducer } from "./payment/payment.reducer"

export const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
  registration: registrationReducer,
})
