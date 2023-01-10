import axios from "axios"

export const BASE_URL = 'http://api.gamifly.io/api/v1'

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': "application/json",
        'timeout' : 1000,
        // 'Access-Control-Allow-Origin' : '*',
        // 'Access-Control-Allow-Credentials' : true,
    }
})