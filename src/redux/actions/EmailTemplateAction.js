import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  EMAIL_TEMPLATE_REQUEST,
  EMAIL_TEMPLATE_SUCCESS,
  EMAIL_TEMPLATE_FAIL,
} from "../types";

export const EmailTemplateAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: EMAIL_TEMPLATE_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "/Booking/UpdateBookingStatus",
      formData
    );
    dispatch({
      type: EMAIL_TEMPLATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMAIL_TEMPLATE_FAIL,
      payload: error?.response?.data,
    });
  }
};
