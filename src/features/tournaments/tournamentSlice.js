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
        },

        deleteTournament : (state,{payload}) => {
            state.data = state.data.filter(d => d.id !== payload)
        }
    }
})

export const { setAllTournaments, deleteTournament } = tournamentSlice.actions

export const getTournaments = (state) => state.tournaments.data

export default tournamentSlice.reducer