import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  CREATE_BOOKING_FAIL,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_RESET,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_SLOT_REQUEST,
  CREATE_BOOKING_SLOT_SUCCESS,
  CREATE_BOOKING_SLOT_FAIL,
  CREATE_BOOKING_SLOT_RESPONSE,
  GETBYID_BOOKING_SLOT_REQUEST,
  GETBYID_BOOKING_SLOT_SUCCESS,
  GETBYID_BOOKING_SLOT_FAIL,
  GETBYID_BOOKING_SLOT_RESPONSE,
  EDIT_BOOKING_SLOT_REQUEST,
  EDIT_BOOKING_SLOT_SUCCESS,
  EDIT_BOOKING_SLOT_FAIL,
  EDIT_BOOKING_SLOT_RESPONSE,
  DELETE_BOOKING_SLOT_REQUEST,
  DELETE_BOOKING_SLOT_SUCCESS,
  DELETE_BOOKING_SLOT_FAIL,
  DELETE_BOOKING_SLOT_RESPONSE,

  
 
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

export const CreateBookingSlotAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_BOOKING_SLOT_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "TimeSlots/AddTimeSlot",
      formData
    );
    dispatch({
      type: CREATE_BOOKING_SLOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BOOKING_SLOT_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetBookingSlotResponse = () => ({
  type: CREATE_BOOKING_SLOT_RESPONSE,
});

export const getByIdBookingSlotAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GETBYID_BOOKING_SLOT_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "TimeSlots/GetSlotById",
      formData
    );
    dispatch({
      type: GETBYID_BOOKING_SLOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GETBYID_BOOKING_SLOT_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const getByIdBookingSlotResponse = () => ({
  type: GETBYID_BOOKING_SLOT_RESPONSE,
});

export const EditBookingSlotAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_BOOKING_SLOT_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "TimeSlots/UpdateTimeSlot",
      formData
    );
    dispatch({
      type: EDIT_BOOKING_SLOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_BOOKING_SLOT_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const EditBookingSlotResponse = () => ({
  type: EDIT_BOOKING_SLOT_RESPONSE,
});

export const deleteBookingSlotAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_BOOKING_SLOT_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "TimeSlots/DeleteTimeSlot",
      formData
    );
    dispatch({
      type: DELETE_BOOKING_SLOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKING_SLOT_FAIL,
      payload: error?.response?.data,
    });
  }
};
export const deleteBookingSlotResponse = () => ({
  type: DELETE_BOOKING_SLOT_RESPONSE,
});
