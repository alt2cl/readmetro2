import { ConstructionOutlined } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'

export const audioplayerSlice = createSlice({
  name: 'audioplayer',
  initialState: {
    currentPlay: {
      show: false,
      play: false,
      title: "",
      index: 1,
      page: 1,
    }
    
    

  },
  reducers: {
    updateCurrentPlay: (state, action) => {
      state.currentPlay = action.payload
      //console.log('current play',action.payload)
    }
    
  }
  
  
})

// Action creators are generated for each case reducer function
export const {updateCurrentPlay } = audioplayerSlice.actions

export default audioplayerSlice.reducer