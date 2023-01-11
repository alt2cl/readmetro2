import { createSlice } from '@reduxjs/toolkit'

let fecha = new Date()

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    //starDate: fecha,
    stringDate: fecha.toLocaleString(('en-CA'), {year: 'numeric', month: '2-digit', day: '2-digit'}).toString(),
    arrayEnableDates: []
    
  },
  
  reducers: {
    updateDateSlice: (state, action) => {
      state.stringDate = action.payload
    },
    updateEnableDatesSlice: (state, action) => {
      state.arrayEnableDates = action.payload
    },
    // updateStarDateSlice: (state, action) => {
    //   state.starDate = action.payload
    // },
  }
  

})

//console.log('arrayEnableDates:', dateSlice.state)

// Action creators are generated for each case reducer function
export const { updateDateSlice, updateEnableDatesSlice } = dateSlice.actions

export default dateSlice.reducer