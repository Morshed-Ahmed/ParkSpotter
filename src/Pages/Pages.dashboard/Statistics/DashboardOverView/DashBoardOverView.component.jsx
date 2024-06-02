import {
  FaCalendarDay,
  FaCarAlt,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
} from "react-icons/fa"
import {
  Card,
  CardContainer,
  CardFooter,
  CardFooterIconBookings,
  CardFooterIconEmployee,
  CardFooterIconRevenue,
  CardFooterIconTickets,
  CardFooterText,
  CardFooterTextUnderLine,
  CardTitle,
  CardValue,
  DashBoardOverViewContainer,
  DashBoardOverViewContainerBody,
  DashBoardOverViewContainerHeader,
  DashBoardOverViewContainerTitle,
  DashBoardOverViewTopSectionContainer,
  TopSectionDateBox,
  TopSectionDateContainer,
  TopSectionDateIcon,
} from "../Statistics.styled"
import { AiFillDollarCircle } from "react-icons/ai"
import { useEffect, useState } from "react"

function DashBoardOverView({ dashboardData }) {
  const [parkOwnerList, setParkOwnerList] = useState(null)
  const [error, setError] = useState(null)
  const [filteredParkOwner, setFilteredParkOwner] = useState(null)
  const [subscriptionData, setSubscriptionData] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (role !== "park_owner") {
      setError(
        new Error("Access denied: Only park owners can access this data.")
      )
      return
    }

    if (userId && token) {
      fetch(
        "https://parkspotter-backened.onrender.com/accounts/parkowner-list/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          const filteredData = data.find(
            (owner) => owner.park_owner_id.id === parseInt(userId)
          )
          setFilteredParkOwner(filteredData)

          if (filteredData && filteredData.subscription_id) {
            return fetch(
              `https://parkspotter-backened.onrender.com/accounts/subscription/${filteredData.subscription_id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            )
          } else {
            throw new Error("No subscription ID found for the park owner.")
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          setSubscriptionData(data)
        })
        .catch((error) => {
          setError(error)
          console.error("Error fetching data:", error)
        })
    } else {
      setError(new Error("User ID or token not found in local storage."))
    }
  }, [])

  return (
    <DashBoardOverViewContainer>
      <DashBoardOverViewTopSectionContainer>
        <DashBoardOverViewContainerTitle>
          <DashBoardOverViewContainerHeader>
            Good Morning,{" "}
            <span style={{ fontWeight: "600" }}>
              {filteredParkOwner?.park_owner_id?.first_name}&nbsp;
              {filteredParkOwner?.park_owner_id?.last_name}
            </span>
            !
          </DashBoardOverViewContainerHeader>
          <DashBoardOverViewContainerBody>
            Here&apos;s what&apos;s happening with your parking-lot today.
          </DashBoardOverViewContainerBody>
        </DashBoardOverViewContainerTitle>
        <TopSectionDateContainer>
          <TopSectionDateBox>
            <span
              style={{ fontWeight: "600", color: "#e2062c", fontSize: "15px" }}
            >
              Subscription Expires:&nbsp;&nbsp;
            </span>
            <span style={{ fontWeight: "700", fontSize: "15px" }}>
              {subscriptionData?.end_date}
            </span>
          </TopSectionDateBox>
          <TopSectionDateIcon>
            <FaCalendarDay
              color="#fff"
              style={{ width: "130%", height: "130%" }}
            />
          </TopSectionDateIcon>
        </TopSectionDateContainer>
      </DashBoardOverViewTopSectionContainer>

      <CardContainer>
        <Card>
          <CardTitle>Total Earnings:&nbsp;&nbsp;</CardTitle>
          <CardValue>
            {dashboardData?.total_earnings}
            <p style={{ fontSize: "16px" }}></p>
          </CardValue>
          <CardFooter>
            <CardFooterText>
              View Paid Tickets
              <CardFooterTextUnderLine />
            </CardFooterText>
            <CardFooterIconTickets>
              <AiFillDollarCircle
                color="#299cdb"
                style={{ width: "60%", height: "60%" }}
              />
            </CardFooterIconTickets>
          </CardFooter>
        </Card>

        <Card>
          <CardTitle>Total Revenue:&nbsp;&nbsp;</CardTitle>
          <CardValue>
            {dashboardData?.net_revenue}
            <p style={{ fontSize: "16px" }}>৳</p>
          </CardValue>
          <CardFooter>
            <CardFooterText>
              View Transactions
              <CardFooterTextUnderLine />
            </CardFooterText>
            <CardFooterIconRevenue>
              <FaMoneyBillWave
                color="#0ab39c"
                style={{ width: "60%", height: "60%" }}
              />
            </CardFooterIconRevenue>
          </CardFooter>
        </Card>
        <Card>
          <CardTitle>Total Bookings:&nbsp;&nbsp;</CardTitle>
          <CardValue>
            {dashboardData?.total_bookings}
            <p style={{ fontSize: "16px" }}></p>
          </CardValue>
          <CardFooter>
            <CardFooterText>
              View Bookings
              <CardFooterTextUnderLine />
            </CardFooterText>
            <CardFooterIconBookings>
              <FaCarAlt
                color="#405189"
                style={{ width: "60%", height: "60%" }}
              />
            </CardFooterIconBookings>
          </CardFooter>
        </Card>
        <Card>
          <CardTitle>Employee Expenses:&nbsp;&nbsp;</CardTitle>
          <CardValue>
            {dashboardData?.total_salary_cost}
            <p style={{ fontSize: "16px" }}>৳</p>
          </CardValue>
          <CardFooter>
            <CardFooterText>
              View Salaries
              <CardFooterTextUnderLine />
            </CardFooterText>
            <CardFooterIconEmployee>
              <FaMoneyCheckAlt
                color="#f7b84b"
                style={{ width: "60%", height: "60%" }}
              />
            </CardFooterIconEmployee>
          </CardFooter>
        </Card>
      </CardContainer>
    </DashBoardOverViewContainer>
  )
}

export default DashBoardOverView
