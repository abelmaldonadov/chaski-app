import { createSlice } from "@reduxjs/toolkit"

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    list: [],
  },
  reducers: {
    set: (state, action) => {
      state.list = action.payload
    },
    add: (state, action) => {
      state.list.push(action.payload)
    },
  },
})

export const { set, add } = messageSlice.actions
export default messageSlice.reducer
