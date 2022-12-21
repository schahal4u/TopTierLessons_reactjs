import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_ALL_BOOKING_REQUEST,
  GET_ALL_BOOKING_SUCCESS,
  GET_ALL_BOOKING_FAIL,
} from "../types";
export const GetAllBookingAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_BOOKING_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Booking/GetAllBookings",
      formData
    );
    dispatch({
      type: GET_ALL_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_BOOKING_FAIL,
      payload: error?.response?.data,
    });
  }
};

// export const ResetBookingResponse = () => ({
//   type: CREATE_BOOKING_RESET,
// });
