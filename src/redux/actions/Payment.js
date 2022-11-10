import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";

import { toast } from "react-toastify";
import {
  CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_RESET,
  CREATE_PAYMENT_SUCCESS,
} from "../types";
export const CreatePaymentAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PAYMENT_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "PayPalpayment/CreateOrder",
      formData
    );
    dispatch({
      type: CREATE_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetPaymentResponse = () => ({
  type: CREATE_PAYMENT_RESET,
});
