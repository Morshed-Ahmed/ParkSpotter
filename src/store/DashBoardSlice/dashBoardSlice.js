import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async () => {
    const userId = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")

    if (!userId || !token) {
      throw new Error("User ID or token not found in local storage.")
    }

    const response = await fetch(
      "https://parkspotter-backened.onrender.com/accounts/park_owner_dashboard/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    return data
  }
)

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.data = null
        state.error = action.error.message
      })
  },
})

export const selectDashboardData = (state) => state.dashboard.data
export const selectDashboardError = (state) => state.dashboard.error
export const dashboardReducer = dashboardSlice.reducer
