import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  CAPTURE_PAYMENT_REQUEST,
  CAPTURE_PAYMENT_SUCCESS,
  CAPTURE_PAYMENT_FAIL,
} from "../types";
export const CapturePaymentAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CAPTURE_PAYMENT_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "PayPalpayment/CapturePayment",
      formData
    );
    dispatch({
      type: CAPTURE_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAPTURE_PAYMENT_FAIL,
      payload: error?.response?.data,
    });
  }
};
