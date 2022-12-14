import { configureStore , getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from '@/redux/features/counter/counterSlice'
import countryReducer from '@/redux/features/country/countrySlice'
import dialogReducer from '@/redux/features/dialog/dialogSlice'
import metatagsReducer from '@/redux/features/metatags/metatagsSlice'
import dateReducer from '@/redux/features/date/dateSlice'
import langReducer from '@/redux/features/lang/langSlice'
import audioplayerReducer from '@/redux/features/audioplayer/audioplayerSlice'
import anchorsectionReducer from './features/anchorsection/anchorsectionSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    country: countryReducer,
    metatags: metatagsReducer,
    dialog: dialogReducer,
    date: dateReducer,
    lang: langReducer,
    audioplayer: audioplayerReducer,
    anchorsection: anchorsectionReducer
    
  },
  middleware: [
    ...getDefaultMiddleware({
        serializableCheck: false
    }),
    
],
//devTools: process.env.NODE_ENV !== 'production' ? { CONFIG_GOES_HERE } : false
})