import { createSlice } from '@reduxjs/toolkit'

export const anchorsectionSlice = createSlice({
  name: 'anchorsection',
  initialState: {
    sections: [],
    anchors: [],
    trigger:null
  },
  reducers: {
    updateAnchorsectionSlice: (state, action) => {
      state.sections = action.payload
    },
    updateAnchorrefSlice: (state, action) => {
        state.anchors = action.payload
    }
    ,
    updateTriggeranchorSlice: (state, action) => {
        state.trigger = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateAnchorsectionSlice, updateAnchorrefSlice, updateTriggeranchorSlice } = anchorsectionSlice.actions

export default anchorsectionSlice.reducer