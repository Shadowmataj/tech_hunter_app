import axios from "axios";

export const config = {
    API_URL: import.meta.env.VITE_API_URL || "/api"
}

export const api = axios.create({
    baseURL: config.API_URL
});