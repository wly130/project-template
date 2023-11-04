import { get, post } from "./request.jsx";

// const baseUrl = "http://localhost:3000";
const baseUrl = "/api";
const api = {
    getInfo(params) {
        return get(baseUrl + '/getInfo', params);
    },
};

export default api;