import { instance } from "../api";

// Get All Tournaments

export const fetchTournaments = async (data) => {
    const res = await instance.post('/contests/all_contest',data)
    return res
}

// Create Tournaments

export const createTournaments  = async (data) => {
    const res = await instance.post('/contests/create_contest',data)
    return res
}
