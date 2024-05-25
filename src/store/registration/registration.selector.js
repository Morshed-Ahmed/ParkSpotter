import { createSelector } from "@reduxjs/toolkit"

const selectRegistrationSlice = (state) => state.registration

export const selectAddress = (state) => selectRegistrationSlice(state).address
export const selectArea = (state) => selectRegistrationSlice(state).area
export const selectCapacity = (state) => selectRegistrationSlice(state).capacity
export const selectConfirmPassword = (state) =>
  selectRegistrationSlice(state).confirm_password
export const selectEmail = (state) => selectRegistrationSlice(state).email
export const selectFirstName = (state) =>
  selectRegistrationSlice(state).first_name
export const selectLastName = (state) =>
  selectRegistrationSlice(state).last_name
export const selectMobileNo = (state) =>
  selectRegistrationSlice(state).mobile_no
export const selectNidCardNo = (state) =>
  selectRegistrationSlice(state).nid_card_no
export const selectPassword = (state) => selectRegistrationSlice(state).password
export const selectSlotSize = (state) =>
  selectRegistrationSlice(state).slot_size
export const selectUsername = (state) => selectRegistrationSlice(state).username

export const selectAddressMemoized = createSelector(
  selectAddress,
  (address) => address
)

export const selectAreaMemoized = createSelector(selectArea, (area) => area)

export const selectCapacityMemoized = createSelector(
  selectCapacity,
  (capacity) => capacity
)

export const selectConfirmPasswordMemoized = createSelector(
  selectConfirmPassword,
  (confirmPassword) => confirmPassword
)

export const selectEmailMemoized = createSelector(selectEmail, (email) => email)

export const selectFirstNameMemoized = createSelector(
  selectFirstName,
  (firstName) => firstName
)

export const selectLastNameMemoized = createSelector(
  selectLastName,
  (lastName) => lastName
)

export const selectMobileNoMemoized = createSelector(
  selectMobileNo,
  (mobileNo) => mobileNo
)

export const selectNidCardNoMemoized = createSelector(
  selectNidCardNo,
  (nidCardNo) => nidCardNo
)

export const selectPasswordMemoized = createSelector(
  selectPassword,
  (password) => password
)

export const selectSlotSizeMemoized = createSelector(
  selectSlotSize,
  (slotSize) => slotSize
)

export const selectUsernameMemoized = createSelector(
  selectUsername,
  (username) => username
)
