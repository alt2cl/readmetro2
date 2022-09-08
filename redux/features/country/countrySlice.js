import { createSlice } from '@reduxjs/toolkit'

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countryName: 'Mundo'
  },
  reducers: {
    updateCountrySlice: (state, action) => {
      state.countryName = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateCountrySlice } = countrySlice.actions

export default countrySlice.reducer