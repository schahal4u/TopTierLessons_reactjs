import axios from "axios";
import { toast } from "react-toastify";
const baseURL = "http://192.168.1.29:8080/api/v1.0/";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// handle config for get/post
const handleConfig = (config) => {
  let token = localStorage.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

// handle request interceptor
axiosInstance.interceptors.request.use(
  (config) => handleConfig(config),
  (error) => Promise.reject(error)
);

// handle response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("error=>", error);
    toast.warn(error?.response?.data?.returnMessage[0]);
    if (error.response.status === 401) {
      console.log("error.response", error.response);
    } else {
      return Promise.reject(error.response);
    }
  }
);
