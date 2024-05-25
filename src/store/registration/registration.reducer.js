import { createSlice } from "@reduxjs/toolkit"

const REGISTRATION_INITIAL_STATE = {
  address: null,
  area: null,
  capacity: null,
  confirm_password: null,
  email: null,
  first_name: null,
  last_name: null,
  mobile_no: null,
  nid_card_no: 12345678901,
  password: null,
  slot_size: null,
  username: null,
}

const registrationSlice = createSlice({
  name: "registration",
  initialState: REGISTRATION_INITIAL_STATE,
  reducers: {
    setRegistrationField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    clearRegistrationFields: () => REGISTRATION_INITIAL_STATE,
  },
})

export const { setRegistrationField, clearRegistrationFields } =
  registrationSlice.actions
export const registrationReducer = registrationSlice.reducer
