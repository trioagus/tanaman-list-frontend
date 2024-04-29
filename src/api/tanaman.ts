import axios from "axios";

export type Tanaman = {
    id?: string;
    name: string;
    latin: string;
    jenis?: {
      id?: string;
      name: string;
    }
    size: string;
    stock: number;
    code: string;
    price: number;
  };
  
let urlBase: string;

const getUrlBase = async () => {
    if (!urlBase) {
        const envModule = await import.meta.env;
        urlBase = envModule.VITE_BASE_URL;
    }
    return urlBase;
};

export const getTanaman = async () => {
    try {
        const baseUrl = await getUrlBase();
        const response = await axios.get(`${baseUrl}/tanaman`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTanamanById = async (id: string) => {
    try {
        const baseUrl = await getUrlBase();
        const response = await axios.get(`${baseUrl}/tanaman/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addTanaman = async (tanaman: Tanaman, token: string) => {
    try {
        const baseUrl = await getUrlBase();
        const response = await axios.post(`${baseUrl}/tanaman`, tanaman, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateTanaman = async (id: string, tanaman: Tanaman, token: string) => {
    try {
        const baseUrl = await getUrlBase();
        const response = await axios.put(`${baseUrl}/tanaman/${id}`, tanaman, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteTanaman = async (id: string, token: string) => {
    try {
        const baseUrl = await getUrlBase();
        const response = await axios.delete(`${baseUrl}/tanaman/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
