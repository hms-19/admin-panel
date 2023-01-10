import { instance } from "../api";


// Create Tournaments

export const createTournaments  = (data) => {
    const res = instance.post('/contests/create_contest',data)

    return res
}

export const apiStatus  = () => {
    const res = instance.get('/')
    return res
}