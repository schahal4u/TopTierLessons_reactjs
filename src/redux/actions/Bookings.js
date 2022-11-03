import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  CREATE_BOOKING_FAIL,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_RESET,
  CREATE_BOOKING_SUCCESS,
} from "../types";
export const CreateBookingAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_BOOKING_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Booking/CreateBooking",
      formData
    );
    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BOOKING_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetBookingResponse = () => ({
  type: CREATE_BOOKING_RESET,
});
