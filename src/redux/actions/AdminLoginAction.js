import axios from "axios";
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAIL,
} from "../types.js";

// user login

export const AdminLoginAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      "http://192.168.1.8:4437/api/v1.0/Auth/SignIn",
      formData
    );
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userData", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error?.response?.data,
      // payload: error,
    });
  }
};

export const SocialLoginAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: SOCIAL_LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      "http://192.168.1.8:4437/api/v1.0/Auth/ExternalLogin",
      formData
    );
    dispatch({
      type: SOCIAL_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userData", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: SOCIAL_LOGIN_FAIL,
      payload: error?.response?.data,
      // payload: error,
    });
  }
};
