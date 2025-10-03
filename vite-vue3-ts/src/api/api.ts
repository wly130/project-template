import {get, post} from './request.js';

const baseUrl: string = import.meta.env.VITE_API_URL;
const api = {
    getInfo: (params: object) => (get(`${baseUrl}/getInfo`, params)),
    updateInfo: (params: object) => (post(`${baseUrl}/updateInfo`, params)),
};

export default api;
