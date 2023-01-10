import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_BY_CHAT_ID_REQUEST,
  GET_BY_CHAT_ID_SUCCESS,
  GET_BY_CHAT_ID_FAIL,
  GET_BY_CHAT_ID_RESET,
  GET_BOOKING_USER_REQUEST,
  GET_BOOKING_USER_SUCCESS,
  GET_BOOKING_USER_FAIL,
  USER_UPLOADFILE_REQUEST,
  USER_UPLOADFILE_SUCCESS,
  USER_UPLOADFILE_FAIL,
  USER_UPLOADFILE_RESET,
} from "../types.js";

export const GetBookingUserAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOKING_USER_REQUEST,
    });
    const { data } = await axiosInstance.post("Chat/GetBookingUser", formData);
    dispatch({
      type: GET_BOOKING_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKING_USER_FAIL,
      payload: error?.response?.data,
    });
  }
};

// export const GetBookingUserResponse = () => ({
//   type: GET_BOOKING_USER_RESET,
// });

export const chatGetByIdAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BY_CHAT_ID_REQUEST,
    });
    const { data } = await axiosInstance.post("Chat/GetChatById", formData);
    dispatch({
      type: GET_BY_CHAT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BY_CHAT_ID_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const chatGetByIdResponse = () => ({
  type: GET_BY_CHAT_ID_RESET,
});

// for upload chat media
export const userUploadFileAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPLOADFILE_REQUEST,
    });
    const { data } = await axiosInstance.post("User/UploadFile", formData);
    dispatch({
      type: USER_UPLOADFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPLOADFILE_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const userUploadFileResponse = () => ({
  type: USER_UPLOADFILE_RESET,
});
