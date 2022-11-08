import { createSlice } from '@reduxjs/toolkit'
import configlang from '@/src/configLang'


export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    currentLang: 'ES',
    dataCurrentLang: configlang.langOptions[0],
  },
  reducers: {
    updateLangSlice: (state, action) => {
      state.currentLang = action.payload
    },
    updateCurrentLangSlice: (state, action) => {
      state.dataCurrentLang = action.payload
    }
  }
  
})

// Action creators are generated for each case reducer function
export const {updateLangSlice, updateCurrentLangSlice } = langSlice.actions

export default langSlice.reducer