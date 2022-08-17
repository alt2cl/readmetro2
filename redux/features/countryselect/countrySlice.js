import { createSlice } from '@reduxjs/toolkit'

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    value: 'Mundo'
  },
  reducers: {
    update: (state, action) => {
      state = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = countrySlice.actions

export default countrySlice.reducer