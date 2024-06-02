import { createSlice } from "@reduxjs/toolkit"

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartType: "Doughnut",
  },
  reducers: {
    setChartType: (state, action) => {
      state.chartType = action.payload
    },
  },
})

export const { setChartType } = chartSlice.actions
export const selectChartType = (state) => state.chart.chartType
export const chartReducer = chartSlice.reducer
