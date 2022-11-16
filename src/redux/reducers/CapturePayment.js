import {
    CAPTURE_PAYMENT_REQUEST,
    CAPTURE_PAYMENT_SUCCESS,
    CAPTURE_PAYMENT_FAIL,
  } from "../types";
  
  const initialState = {
    capturePayment: undefined,
  };
  
  export const CapturePaymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CAPTURE_PAYMENT_REQUEST:
        return { loading: true };
      case CAPTURE_PAYMENT_SUCCESS:
        return { ...state, loading: false, capturePayment: action.payload };
      case CAPTURE_PAYMENT_FAIL:
        return { ...state, loading: false, capturePayment: action.payload };
      default:
        return state;
    }
  };
  