import { configureStore } from '@reduxjs/toolkit'
import api from './api/apiSlice'
import botSliceReducer from './slices/botSlice'

const store = configureStore({
  reducer: {
    bot: botSliceReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export default store
