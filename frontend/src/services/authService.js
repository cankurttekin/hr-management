import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../config';

export const login = async (username, password) => {
  try {
    const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/auth/login`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      // Check for specific response status
      if (error.response.status === 401) {
        throw new Error("Hatalı kullanıcı adı veya şifre.");
      } else {
        throw new Error(error.response.data.message || "Giriş yaparken bir sorun oluştu, lütfen daha sonra tekrar deneyiniz.");
      }
    } else {
      throw new Error("Bağlantı hatası. Lütfen daha sonra tekrar deneyiniz.");
    }
  }
};

export const register = async (username, email, password) => {
  return axios.post(`${REACT_APP_BACKEND_URL}/auth/register`, { username, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
  /*
    return axios.post(REACT_APP_BACKEND_URL + "signout").then((response) => {
      return response.data;
    });
  */
};

export const getCurrentUser = () => {
  return localStorage.getItem("token");
};

