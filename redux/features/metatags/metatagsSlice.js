import { createSlice } from '@reduxjs/toolkit'

export const metatagsSlice = createSlice({
  name: 'metatags',
  initialState: {
    title: 'Read Metro',
  },
  reducers: {
    updateMetatagsSlice: (state, action) => {
      state.tags = action.payload
    }
  }
  
})

// Action creators are generated for each case reducer function
export const {updateMetatagsSlic } = metatagsSlice.actions

export default metatagsSlice.reducer