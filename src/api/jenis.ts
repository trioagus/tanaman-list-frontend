import axios from "axios";

type Jenis = {
  id?: string;
  name: string;
};

let urlBase: string;

const getUrlBase = async () => {
  if (!urlBase) {
    const envModule = await import.meta.env;
    urlBase = envModule.VITE_BASE_URL;
  }
  return urlBase;
};

export const getJenis = async () => {
  try {
    const baseUrl = await getUrlBase();
    const response = await axios.get(`${baseUrl}/jenis`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getJenisById = async (id: string) => {
  try {
    const baseUrl = await getUrlBase();
    const response = await axios.get(`${baseUrl}/jenis/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addJenis = async (jenis: Jenis, token: string) => {
  try {
    const baseUrl = await getUrlBase();
    const response = await axios.post(`${baseUrl}/jenis`, jenis, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateJenis = async (id: string, jenis: Jenis, token: string) => {
  try {
    const baseUrl = await getUrlBase();
    const response = await axios.put(`${baseUrl}/jenis/${id}`, jenis, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteJenis = async (id: string) => {
  try {
    const baseUrl = await getUrlBase();
    const response = await axios.delete(`${baseUrl}/api/jenis/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
