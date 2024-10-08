import { configureStore } from '@reduxjs/toolkit'
import api from './api/apiSlice'
import botSlice from './slices/botSlice'

const store = configureStore({
  reducer: {
    bot: botSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export default store
