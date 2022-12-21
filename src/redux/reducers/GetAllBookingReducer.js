import {
  GET_ALL_BOOKING_REQUEST,
  GET_ALL_BOOKING_SUCCESS,
  GET_ALL_BOOKING_FAIL,
} from "../types.js";

const initialState = {
  createBooking: undefined,
};

export const GetAllBookingReducer = (state = initialState, action) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case GET_ALL_BOOKING_REQUEST:
      return { loading: true };
    case GET_ALL_BOOKING_SUCCESS:
      return { ...state, loading: false, getAllBooking: action.payload };
    case GET_ALL_BOOKING_FAIL:
      return { ...state, loading: false, getAllBooking: action.payload };
    //   case CREATE_BOOKING_RESET:
    //     return { ...state, loading: false, createBooking: null };
    default:
      return state;
  }
};
