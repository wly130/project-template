import {get, post} from './request.js';

const api = {
    login: (params) => (post(`/login`, params)),
    getInfo: (params) => (get(`/getInfo`, params)),
    updateInfo: (params) => (post(`/updateInfo`, params)),
};

export default api;
