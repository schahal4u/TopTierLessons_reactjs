import axios from "axios";
import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";

import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAIL,
  SOCIAL_LOGOUT,
} from "../types.js";

// user login

export const AdminLoginAction = (formData) => async (dispatch) => {
  // debugger;
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const { data } = await axiosInstance.post("Auth/SignIn", formData);

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userData", JSON.stringify(data.data));
    localStorage.setItem("token", data.data.access_token);
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error?.response?.data,
      // payload: error,
    });
  }
};

export const adminLoginReset = () => ({
  type: ADMIN_LOGOUT,
});

export const SocialLoginAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: SOCIAL_LOGIN_REQUEST,
    });

    const { data } = await axiosInstance.post("Auth/ExternalLogin", formData);
    dispatch({
      type: SOCIAL_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userData", JSON.stringify(data.data));
    localStorage.setItem("token", data.data.access_token);
  } catch (error) {
    dispatch({
      type: SOCIAL_LOGIN_FAIL,
      payload: error?.response?.data,
      // payload: error,
    });
  }
};

export const socialLoginReset = () => ({
  type: SOCIAL_LOGOUT,
});
