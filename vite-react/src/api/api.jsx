import {get, post} from "./request.jsx";

const baseUrl = import.meta.env.VITE_API_URL;
const api = {
    getInfo: (params) => (get(`${baseUrl}/getInfo`, params)),
};

export default api;