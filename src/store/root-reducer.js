import { combineReducers } from "@reduxjs/toolkit"
import { userReducer } from "../store/user/user.reducer"
import { registrationReducer } from "./registration/registration.reducer"
import { paymentReducer } from "./payment/payment.reducer"
import { chartReducer } from "./ChartSlice/chartSlice"
import { dashboardReducer } from "./DashBoardSlice/dashBoardSlice"
import { filterReducer } from "./FilterSlice/filterSlice"

export const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
  registration: registrationReducer,
  chart: chartReducer,
  filter: filterReducer,
  dashboard: dashboardReducer,
})
