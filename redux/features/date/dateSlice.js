import { createSlice } from '@reduxjs/toolkit'

const fecha = new Date()

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    //starDate: fecha,
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
    // updateStarDateSlice: (state, action) => {
    //   state.starDate = action.payload
    // },
  }
  

})

//console.log('arrayEnableDates:', dateSlice.state)

// Action creators are generated for each case reducer function
export const { updateDateSlice, updateEnableDatesSlice } = dateSlice.actions

export default dateSlice.reducer