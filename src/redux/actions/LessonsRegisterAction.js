import axios from "axios";
import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors.js";
import {
  LESSONS_REGISTER_REQUEST,
  LESSONS_REGISTER_SUCCESS,
  LESSONS_REGISTER_FAIL,
  LESSONS_REGISTER_RESET,
} from "../types.js";

// user login

export const LessonsRegisterAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: LESSONS_REGISTER_REQUEST,
    });

    const { data } = await axiosInstance.post("Auth/Register", formData);
    dispatch({
      type: LESSONS_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userData", JSON.stringify(data.data));
    localStorage.setItem("token", data.data.access_token);
  } catch (error) {
    dispatch({
      type: LESSONS_REGISTER_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const emptyRegisterResponse = () => ({
  type: LESSONS_REGISTER_RESET,
});
