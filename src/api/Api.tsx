import axios, { AxiosRequestConfig } from 'axios'


//default api base url
const api = axios.create({
    baseURL: 'https://feedback-heroku.herokuapp.com',
    headers: {
        accept: 'application/json'
    }
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {...config.headers, Authorization: `Bearer ${getToken()}`}
    return config
}, (err: any) => {
    return Promise.reject(err)
})

const getToken = () => (localStorage.getItem('token'))

export default api