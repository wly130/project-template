import { get, post } from "./request.ts";

// const baseUrl: string = "http://localhost:3000";
const baseUrl: string = "/api";
const api = {
    getInfo(params: object) {
        return get(baseUrl + '/getInfo', params);
    },
}

export default api;