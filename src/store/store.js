import { configureStore } from "@reduxjs/toolkit"
import chatReducer from "./features/chatSlice"
import userReducer from "./features/userSlice"
import directoryReducer from "./features/directorySlice"
import messageReducer from "./features/messageSlice"

export default configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
    directory: directoryReducer,
    message: messageReducer,
  },
})
