import { configureStore } from '@reduxjs/toolkit'
import tournamentReducer from '../features/tournaments/tournamentSlice'

export const store = configureStore({
  reducer: {
    tournaments: tournamentReducer
  },
})