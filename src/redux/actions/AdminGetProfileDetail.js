// import axios from "axios";
import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  ADMIN_GET_PROFILE_REQUEST,
  ADMIN_GET_PROFILE_SUCCESS,
  ADMIN_GET_PROFILE_FAIL,
  ADMIN_GET_PROFILE_RESET,
} from "../types.js";


export const AdminGetProfileDetailAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_PROFILE_REQUEST,
    });
    const { data } = await axiosInstance.get("User/GetUserProfile");
    dispatch({
      type: ADMIN_GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_PROFILE_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const emptyGetProfileResponse = () => ({
  type: ADMIN_GET_PROFILE_RESET,
});
