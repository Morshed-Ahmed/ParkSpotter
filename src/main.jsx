import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./Routes/Routes.jsx"
import { Provider } from "react-redux"
import { store } from "./store/store.js"
import { Toaster } from "react-hot-toast"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "./Utils/Stripe/stripe.utils.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </Elements>
    </Provider>
  </React.StrictMode>
)
