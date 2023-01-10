import axios from "axios"

export const BASE_URL = 'https://api.gamifly.co/api/v1'

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin' : '*'
    }
})