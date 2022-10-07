import { createSlice } from '@reduxjs/toolkit'

export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    currentLang: 'ES',
    
  },
  reducers: {
    updateLangSlice: (state, action) => {
      state.currentLang = action.payload
    }
  }
  
})

// Action creators are generated for each case reducer function
export const {updateLangSlice } = langSlice.actions

export default langSlice.reducer