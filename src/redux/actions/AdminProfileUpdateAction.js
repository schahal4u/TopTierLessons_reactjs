// import axios from "axios";
import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors.js";
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_RESPONSE_RESET,
} from "../types.js";

export const AdminProfileUpdateAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axiosInstance.post(
      "User/UpdateUserProfile",
      formData
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error,
    });
  }
};

export const emptyUpdateProfileResponse = () => ({
  type: UPDATE_RESPONSE_RESET,
});
