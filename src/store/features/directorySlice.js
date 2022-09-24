import { createSlice } from "@reduxjs/toolkit"

export const directorySlice = createSlice({
  name: "directory",
  initialState: {
    list: [],
  },
  reducers: {
    set: (state, action) => {
      state.list = action.payload
    },
  },
})

export const { set } = directorySlice.actions
export default directorySlice.reducer
