import { createSlice } from "@reduxjs/toolkit"

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    list: [],
  },
  reducers: {
    set: (state, action) => {
      state.list = action.payload.sort(
        (a, b) => a.t2.insertionDate < b.t2.insertionDate
      )
    },
    send: (state, action) => {
      state.list = state.list
        .map((el) => {
          if (el.t1.id === action.payload.receptor) {
            return {
              t1: el.t1,
              t2: action.payload,
            }
          } else return el
        })
        .sort((a, b) => a.t2.insertionDate < b.t2.insertionDate)
    },
    receive: (state, action) => {
      state.list = state.list
        .map((el) => {
          if (el.t1.id === action.payload.sender) {
            return {
              t1: el.t1,
              t2: action.payload,
            }
          } else return el
        })
        .sort((a, b) => a.t2.insertionDate < b.t2.insertionDate)
    },
  },
})

export const { set, send, receive } = chatSlice.actions
export default chatSlice.reducer
