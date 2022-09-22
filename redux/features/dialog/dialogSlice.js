import { createSlice } from '@reduxjs/toolkit'

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    open: false,
    imagesvalues: {
      ruta:'',
      arrayimages: [],
      pagina: '',
      fecha:'',
      edicion:'',
      recortes: [],
      width: '',
      height: '',
    }
  },
  reducers: {
    openDialog: state => {state.open = true},
    closeDialog: state => {
      console.log('cerrando')
      state.open = false
    },
    updateDialogSlice: (state, action) => {
      state.imagesvalues = action.payload
    }
  }
  
})

// Action creators are generated for each case reducer function
export const {openDialog, closeDialog, updateDialogSlice } = dialogSlice.actions

export default dialogSlice.reducer