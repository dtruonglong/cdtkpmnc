import axios from "axios";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

axios.defaults.withCredentials = true

export const fetchDataClientSite = axios.create({
    baseURL: publicRuntimeConfig.BACKEND_URL + "/api",
    timeout: 10000,
});