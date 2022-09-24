import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: undefined,
  },
  reducers: {
    set: (state, action) => {
      state.data = action.payload
    },
    unset: (state) => {
      state.data = null
    },
  },
})

export const { set, unset } = userSlice.actions
export default userSlice.reducer
