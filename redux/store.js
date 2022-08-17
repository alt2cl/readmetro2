import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/redux/features/counter/counterSlice'
import countryReducer from '@/redux/features/countryselect/countrySlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    country: countryReducer,
  }
})