import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/redux/features/counter/counterSlice'
import countryReducer from '@/redux/features/country/countrySlice'
import dialogReducer from '@/redux/features/dialog/dialogSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    country: countryReducer,
    dialog: dialogReducer
  }
})