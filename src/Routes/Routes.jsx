import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Pages.home/Home/Home";
import SignIn from "../Pages/Pages.authentication/SignIn/SignIn";
import SignUp from "../Pages/Pages.authentication/SignUp/SignUp";
import DashboardRoutes from "../Layout/Dashboard.routes";
import AvailableParkingSlot from "../Pages/Pages.dashboard/AvailableParkingSlot/AvailableParkingSlot";
import UnpaidTickets from "../Pages/Pages.dashboard/UnpaidTickets/UnpaidTickets";
import CreateTicket from "../Pages/Pages.dashboard/CreateTicket/CreateTicket.component";
import PaymentForm from "../Components/PaymentForm/PaymentForm.component";
import RegisterEmployee from "../Pages/Pages.dashboard/RegisterEmployee/RegisterEmployee.component";

import TicketPayment from "../Pages/Pages.dashboard/TicketPayment/TicketPayment.component";
import EmployeeList from "../Pages/Pages.dashboard/EmployeeList/EmployeeList.component";
import Statistics from "../Pages/Pages.dashboard/Statistics/Statistics.component";
import DemoDashboard from "../Pages/Pages.DemoDashboard/DemoDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "payment",
        element: <PaymentForm />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardRoutes />,
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "CreateParkingTicket",
        element: <CreateTicket />,
      },
      {
        path: "AvailableParkingSlot",
        element: <AvailableParkingSlot />,
      },
      {
        path: "UnpaidTickets",
        element: <UnpaidTickets />,
      },
      {
        path: "RegisterEmployee",
        element: <RegisterEmployee />,
      },
      {
        path: "TicketPayment",
        element: <TicketPayment />,
      },
      {
        path: "EmployeeList",
        element: <EmployeeList />,
      },
    ],
  },
  {
    path: "demoDashboard",
    element: <DemoDashboard />,
  },
]);
