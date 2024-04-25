import axios from "axios";

const urlBase = import.meta.env.VITE_BASE_URL;

type User = {
    id?: string;
   username: string;
    password?: string;
  };

export const register = async (user: User) => {
  try {
    const response = await axios.post(`${urlBase}/auth/register`, user);

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const login = async (user: User) => {
  try {
    const response = await axios.post(`${urlBase}/auth/login`, user);

    return response;
  } catch (error: any) {
    return error.response.data;
  }
};

export const logout = async () => {
    try {
      const response = await axios.post(`${urlBase}/auth/logout/:id`);
  
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
