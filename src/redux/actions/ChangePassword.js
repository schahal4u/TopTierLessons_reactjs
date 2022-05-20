import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors.js";
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "../types.js";

export const ChangePasswordAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
    });

    const { data } = await axiosInstance.post("Auth/ChangePassword", formData);

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error?.response?.data,
    });
  }
};
