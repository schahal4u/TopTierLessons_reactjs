import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_ALL_SLOTS_REQUEST,
  GET_ALL_SLOTS_SUCCESS,
  GET_ALL_SLOTS_FAIL,
} from "../types.js";

export const GetAllSlotsAction = (formData) => async (dispatch) => {
  // debugger;
  try {
    dispatch({
      type: GET_ALL_SLOTS_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "TimeSlots/GetAllTimeSlots",
      formData
    );
    dispatch({
      type: GET_ALL_SLOTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SLOTS_FAIL,
      payload: error?.response?.data,
    });
  }
};
