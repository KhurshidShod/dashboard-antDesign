import axios from "axios";

const request = axios.create({
    baseURL: 'https://6528c4ac931d71583df26f7b.mockapi.io/',
    timeout: 10000
});

export default request;