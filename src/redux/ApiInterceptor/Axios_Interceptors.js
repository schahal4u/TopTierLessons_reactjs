import axios from "axios";
// Add a request interceptor
export const axiosInstance = axios.create({
  baseURL: "http://3.110.189.235:3000/",
});
axiosInstance.interceptors.request.use(
  (config) => {
    let Token = JSON.parse(localStorage.token);
    if (Token) {
      config.headers = {
        accesstoken: `${Token}`,
        "Content-Type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
