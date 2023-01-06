import {
  GET_ALL_BOOKING_REQUEST,
  GET_ALL_BOOKING_SUCCESS,
  GET_ALL_BOOKING_FAIL,
  GET_ALL_BOOKING_ID_REQUEST,
  GET_ALL_BOOKING_ID_SUCCESS,
  GET_ALL_BOOKING_ID_FAIL,

  PREVIOUS_BOOKING_REQUEST,
  PREVIOUS_BOOKING_SUCCESS,
  PREVIOUS_BOOKING_FAIL,

  UPCOMING_BOOKING_REQUEST,
  UPCOMING_BOOKING_SUCCESS,
  UPCOMING_BOOKING_FAIL,

  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAIL,
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

export const GetAllBookingDetailsByIdReducer = (
  state = initialState,
  action
) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case GET_ALL_BOOKING_ID_REQUEST:
      return { loading: true };
    case GET_ALL_BOOKING_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        getAllBookingDetailsById: action.payload,
      };
    case GET_ALL_BOOKING_ID_FAIL:
      return {
        ...state,
        loading: false,
        getAllBookingDetailsById: action.payload,
      };
    //   case CREATE_BOOKING_RESET:
    //     return { ...state, loading: false, createBooking: null };
    default:
      return state;
  }
};

export const PreviousBookingReducer = (state = initialState, action) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case PREVIOUS_BOOKING_REQUEST:
      return { loading: true };
    case PREVIOUS_BOOKING_SUCCESS:
      return { ...state, loading: false, previousBooking: action.payload };
    case PREVIOUS_BOOKING_FAIL:
      return { ...state, loading: false, previousBooking: action.payload };
    default:
      return state;
  }
};

export const upcomingBookingsReducer = (state = initialState, action) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case UPCOMING_BOOKING_REQUEST:
      return { loading: true };
    case UPCOMING_BOOKING_SUCCESS:
      return { ...state, loading: false, upcomingBooking: action.payload };
    case UPCOMING_BOOKING_FAIL:
      return { ...state, loading: false, upcomingBooking: action.payload };
    default:
      return state;
  }
};

export const DeleteBookingReducer = (state = initialState, action) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case DELETE_BOOKING_REQUEST:
      return { loading: true };
    case DELETE_BOOKING_SUCCESS:
      return { ...state, loading: false, deleteBooking: action.payload };
    case DELETE_BOOKING_FAIL:
      return { ...state, loading: false, deleteBooking: action.payload };
    default:
      return state;
  }
};
