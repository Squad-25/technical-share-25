import axios from 'axios';

const api = axios.create({
    baseURL: 'https://technical-share-squad25.herokuapp.com/'
})

export default api;