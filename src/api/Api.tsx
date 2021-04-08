import axios from 'axios'

export default axios.create({
    baseURL: 'https://feedback-heroku.herokuapp.com',
    headers: {
        accept: 'application/json'
    }
})