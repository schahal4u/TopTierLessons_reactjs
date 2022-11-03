import {
  CREATE_BOOKING_FAIL,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_RESET,
  CREATE_BOOKING_SUCCESS,
} from "../types.js";

const initialState = {
  createBooking: undefined,
};

export const CreateBookingReducer = (state = initialState, action) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case CREATE_BOOKING_REQUEST:
      return { loading: true };
    case CREATE_BOOKING_SUCCESS:
      return { ...state, loading: false, createBooking: action.payload };
    case CREATE_BOOKING_FAIL:
      return { ...state, loading: false, createBooking: action.payload };
    case CREATE_BOOKING_RESET:
      return { ...state, loading: false, createBooking: null };
    default:
      return state;
  }
};
