import { createSlice } from '@reduxjs/toolkit'

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    starDate: new Date(),
    stringDate: '',
    arrayEnableDates: []
    
  },
  
  reducers: {
    updateDateSlice: (state, action) => {
      state.stringDate = action.payload
    },
    updateEnableDatesSlice: (state, action) => {
      state.arrayEnableDates = action.payload
    },
  }
  

})

//console.log('arrayEnableDates:', dateSlice.state)

// Action creators are generated for each case reducer function
export const { updateDateSlice, updateEnableDatesSlice } = dateSlice.actions

export default dateSlice.reducer