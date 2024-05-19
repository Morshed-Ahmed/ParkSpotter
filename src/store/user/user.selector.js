import { createSelector } from "@reduxjs/toolkit"

const selectUser = (state) => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
)

export const selectUserType = createSelector(
  [selectUser],
  (user) => user.userType
)
