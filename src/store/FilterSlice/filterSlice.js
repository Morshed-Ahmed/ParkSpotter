import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    selectedFilter: "",
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    minTickets: "",
    maxTickets: "",
  },
  reducers: {
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload
    },
    setMinTickets: (state, action) => {
      state.minTickets = action.payload
    },
    setMaxTickets: (state, action) => {
      state.maxTickets = action.payload
    },
  },
})

export const {
  setSelectedFilter,
  setStartDate,
  setEndDate,
  setMinPrice,
  setMaxPrice,
  setMinTickets,
  setMaxTickets,
} = filterSlice.actions

export const selectSelectedFilter = (state) => state.filter.selectedFilter
export const selectStartDate = (state) => state.filter.startDate
export const selectEndDate = (state) => state.filter.endDate
export const selectMinPrice = (state) => state.filter.minPrice
export const selectMaxPrice = (state) => state.filter.maxPrice
export const selectMinTickets = (state) => state.filter.minTickets
export const selectMaxTickets = (state) => state.filter.maxTickets

export const filterReducer = filterSlice.reducer
