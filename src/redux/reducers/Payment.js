import {
  CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_RESET,
  CREATE_PAYMENT_SUCCESS,
} from "../types";

const initialState = {
  createPayment: undefined,
};

export const CreatePaymentReducer = (state = initialState, action) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case CREATE_PAYMENT_REQUEST:
      return { loading: true };
    case CREATE_PAYMENT_SUCCESS:
      return { ...state, loading: false, createPayment: action.payload };
    case CREATE_PAYMENT_FAIL:
      return { ...state, loading: false, createPayment: action.payload };
    case CREATE_PAYMENT_RESET:
      return { ...state, loading: false, createPayment: null };
    default:
      return state;
  }
};
