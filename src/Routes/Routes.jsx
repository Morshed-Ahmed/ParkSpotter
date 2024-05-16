import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Pages.home/Home/Home";
import SignIn from "../Pages/Pages.authentication/SignIn/SignIn";
import SignUp from "../Pages/Pages.authentication/SignUp/SignUp";
import DashboardRoutes from "../Layout/Dashboard.routes";
import AvailableParkingSlot from "../Pages/Pages.dashboard/AvailableParkingSlot/AvailableParkingSlot";
import UnpaidTickets from "../Pages/Pages.dashboard/UnpaidTickets/UnpaidTickets";
import CreateTicket from "../Pages/Pages.dashboard/CreateTicket/CreateTicket.component";

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
    ],
  },
  {
    path: "dashboard",
    element: <DashboardRoutes />,
    children: [
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
    ],
  },
]);
