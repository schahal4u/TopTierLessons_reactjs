import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_ALL_BOOKING_REQUEST,
  GET_ALL_BOOKING_SUCCESS,
  GET_ALL_BOOKING_FAIL,
  GET_ALL_BOOKING_ID_REQUEST,
  GET_ALL_BOOKING_ID_SUCCESS,
  GET_ALL_BOOKING_ID_FAIL,

  PREVIOUS_BOOKING_REQUEST,
  PREVIOUS_BOOKING_SUCCESS,
  PREVIOUS_BOOKING_FAIL,

  UPCOMING_BOOKING_REQUEST,
  UPCOMING_BOOKING_SUCCESS,
  UPCOMING_BOOKING_FAIL,

  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAIL,
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

export const GetAllBookingDetailsByIdAction =
  (formData) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_BOOKING_ID_REQUEST,
      });
      const { data } = await axiosInstance.post(
        "Booking/GetBookingDetailsById",
        formData
      );
      dispatch({
        type: GET_ALL_BOOKING_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_BOOKING_ID_FAIL,
        payload: error?.response?.data,
      });
    }
  };

export const PreviousBookingAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: PREVIOUS_BOOKING_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Booking/GetBookingHistory",
      formData
    );
    dispatch({
      type: PREVIOUS_BOOKING_SUCCESS,
      payload: data,
    });
  }
  catch (error) {
    dispatch({
      type: PREVIOUS_BOOKING_FAIL,
      payload: error?.response?.data,
    });
  }
}

export const UpcomingBookingsAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPCOMING_BOOKING_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Booking/GetUpComingBookings",
      formData
    );
    dispatch({
      type: UPCOMING_BOOKING_SUCCESS,
      payload: data,
    });
  }
  catch (error) {
    dispatch({
      type: UPCOMING_BOOKING_FAIL,
      payload: error?.response?.data,
    });
  }
}

export const DeleteBookingAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_BOOKING_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Booking/CancelBooking",
      formData
    );
    dispatch({
      type: DELETE_BOOKING_SUCCESS,
      payload: data,
    });
  }
  catch (error) {
    dispatch({
      type: DELETE_BOOKING_FAIL,
      payload: error?.response?.data,
    });
  }
}
// export const ResetBookingResponse = () => ({
//   type: CREATE_BOOKING_RESET,   
// });
