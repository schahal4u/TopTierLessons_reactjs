import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://34.236.154.119:4437/api/v1.0/",
});
axiosInstance.interceptors.request.use(
  (config) => {
    let Token = JSON.parse(localStorage.token);
    if (Token) {
      config.headers = {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
