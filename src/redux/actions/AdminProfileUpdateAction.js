// import axios from "axios";
import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors.js";
import {
  ADMIN_UPDATE_PROFILE_REQUEST,
  ADMIN_UPDATE_PROFILE_SUCCESS,
  ADMIN_UPDATE_PROFILE_FAIL,
  ADMIN_UPDATE_RESPONSE_RESET,
} from "../types.js";

export const AdminProfileUpdateAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axiosInstance.post(
      "User/UpdateUserProfile",
      formData
    );

    dispatch({
      type: ADMIN_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_PROFILE_FAIL,
      payload: error,
    });
  }
};

export const emptyUpdateProfileResponse = () => ({
  type: ADMIN_UPDATE_RESPONSE_RESET,
});
