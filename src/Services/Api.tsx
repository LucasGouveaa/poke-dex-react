import axios from "axios";
import getCookie from "../Helpers/GetCookie";



const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    },
    withCredentials: true
})

api.interceptors.request.use(async (config) => {
    const token = getCookie('jwt_token')

    if (token && config && config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api