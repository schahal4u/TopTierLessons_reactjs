import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  CONTACT_US_FAIL,
  CONTACT_US_REQUEST,
  CONTACT_US_RESET,
  CONTACT_US_SUCCESS,
} from "../types";

export const ContactUsAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CONTACT_US_REQUEST,
    });
    const { data } = await axiosInstance.post("ContactUs/ContactUs", formData);
    dispatch({
      type: CONTACT_US_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_US_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetContactUsResponse = () => ({
  type: CONTACT_US_RESET,
});
