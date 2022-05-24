import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_PROFILE_DETAIL_REQUEST,
  GET_PROFILE_DETAIL_SUCCESS,
  GET_PROFILE_DETAIL_FAIL,
  GET_PROFILE_DETAIL_RESET,
} from "../types.js";

export const AdminGetProfileDetailAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROFILE_DETAIL_REQUEST,
    });
    const { data } = await axiosInstance.get("User/GetUserProfile");
    dispatch({
      type: GET_PROFILE_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_DETAIL_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const emptyGetProfileResponse = () => ({
  type: GET_PROFILE_DETAIL_RESET,
});
