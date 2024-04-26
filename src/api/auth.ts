import axios from "axios";

let urlBase: string;

const getUrlBase = async () => {
    if (!urlBase) {
        const envModule = await import.meta.env;
        urlBase = envModule.VITE_BASE_URL;
    }
    return urlBase;
};

type User = {
    id?: string;
    username: string;
    password?: string;
};

export const register = async (user: User) => {
    try {
        const baseUrl = await getUrlBase();
        const response = await axios.post(`${baseUrl}/auth/register`, user);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const login = async (user: User) => {
    try {
        const baseUrl = await getUrlBase();
        const response = await axios.post(`${baseUrl}/auth/login`, user);
        return response;
    } catch (error: any) {
        return error.response.data;
    }
};

export const logout = async () => {
    try {
        const baseUrl = await getUrlBase();
        const response = await axios.post(`${baseUrl}/auth/logout`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};