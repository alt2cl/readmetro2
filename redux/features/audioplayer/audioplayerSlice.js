import { ConstructionOutlined } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'

export const audioplayerSlice = createSlice({
  name: 'audioplayer',
  initialState: {
    currentPlay: {
      show: false,
      play: false,
      title: "",
      index: 0,
      page: 0,
    },
    playList: []
  },
  reducers: {
    updateCurrentPlay: (state, action) => {
      console.log('el dispach', action.payload)
      state.currentPlay = action.payload
    },
    updatePlayList: (state, action) => {
      console.log('esto recibe el playlist', action.payload)
      state.playList.push(action.payload) 
    }
    
  }
  
  
})

// Action creators are generated for each case reducer function
export const {updateCurrentPlay, updatePlayList } = audioplayerSlice.actions

export default audioplayerSlice.reducer