import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState = {
    data : []
}

export const tournamentSlice = createSlice({
    name: 'tournaments',
    initialState,
    reducers:{
        setAllTournaments : (state,{payload}) => {
            state.data = payload
        }
    }
})

export const { setAllTournaments } = tournamentSlice.actions

export const getTournaments = (state) => state.tournaments.data

export default tournamentSlice.reducer