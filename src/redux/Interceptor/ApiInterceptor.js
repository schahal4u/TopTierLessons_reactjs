import axios from "axios";
// Add a request interceptor
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
axiosInstance.interceptors.request.use(
  (config) => {
    let Token = JSON.parse(localStorage.userInfo);

    // let Token = localStorage?.userInfo?.token;
    if (Token) {
      config.headers = {
        Authorization: `Bearer ${Token.token} `,
        // token: JSON.parse(Token),
        "Content-Type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
