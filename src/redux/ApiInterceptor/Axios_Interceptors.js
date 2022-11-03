// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "https://toptierlessons.com:4437/api/v1.0/",
// });
// axiosInstance.interceptors.request.use(
//   (config) => {
//     let Token = JSON.parse(localStorage.token);
//     if (Token) {
//       config.headers = {
//         Authorization: `Bearer ${Token}`,
//         "Content-Type": "application/json",
//       };
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

import axios from "axios";
import { toast } from "react-toastify";
const baseURL = "https://toptierlessons.com:4437/api/v1.0/";

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
    console.log("error=>", error?.response?.data?.returnMessage[0]);
    toast.warn(error?.response?.data?.returnMessage[0]);
    if (error.response.status === 401) {
      console.log("error.response", error.response);
    } else {
      return Promise.reject(error.response);
    }
  }
);
