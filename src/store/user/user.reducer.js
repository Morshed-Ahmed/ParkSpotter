import { createSlice } from "@reduxjs/toolkit"

const USER_INITIAL_STATE = {
  currentUser: "",
  userType: "",
}

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    setUserType: (state, action) => {
      state.userType = action.payload
    },
  },
})

export const { setCurrentUser, setUserType } = userSlice.actions
export const userReducer = userSlice.reducer
