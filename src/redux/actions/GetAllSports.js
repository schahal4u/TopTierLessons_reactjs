import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_ALL_SPORTS_REQUEST,
  GET_ALL_SPORTS_SUCCESS,
  GET_ALL_SPORTS_FAIL,
  GET_ALL_SPORTS_RESET,
} from "../types.js";

export const GetAllSportsAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SPORTS_REQUEST,
    });
    const { data } = await axiosInstance.post("Sport/GetAllSport", formData);
    dispatch({
      type: GET_ALL_SPORTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SPORTS_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetAllSportsResponse = () => ({
  type: GET_ALL_SPORTS_RESET,
});
