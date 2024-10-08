import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  runId: undefined
}

export const botSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    setRunId: (state, action) => {
      state.runId = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setRunId } = botSlice.actions

export default botSlice.reducer
