import axios from 'axios';

export default axios.create({
    baseURL:'https://movie-ticket-app-server.vercel.app/api/',
})
