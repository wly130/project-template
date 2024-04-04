import {get, post} from './request.js';

const baseUrl = import.meta.env.VITE_API_URL;
const api = {
    getInfo: (params) => (get(`${baseUrl}/getInfo`, params)),
    updateInfo: (params) => (post(`${baseUrl}/updateInfo`, params)),
};

export default api;
