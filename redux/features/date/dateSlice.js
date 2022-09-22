import { createSlice } from '@reduxjs/toolkit'

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    startDate: new Date(),
    stringDate: ''
    
  },
  
  reducers: {
    updateDateSlice: (state, action) => {
        console.log('action payload', action.payload)
      state.stringDate = action.payload
    }
  }
  

})

console.log('action payload 1:', dateSlice.state)

// Action creators are generated for each case reducer function
export const { updateDateSlice } = dateSlice.actions

export default dateSlice.reducer