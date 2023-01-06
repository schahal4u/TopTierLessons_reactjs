import {
  CREATE_BOOKING_FAIL,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_RESET,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_SLOT_REQUEST,
  CREATE_BOOKING_SLOT_SUCCESS,
  CREATE_BOOKING_SLOT_FAIL,
  CREATE_BOOKING_SLOT_RESPONSE,
  GETBYID_BOOKING_SLOT_REQUEST,
  GETBYID_BOOKING_SLOT_SUCCESS,
  GETBYID_BOOKING_SLOT_FAIL,
  GETBYID_BOOKING_SLOT_RESPONSE,
  EDIT_BOOKING_SLOT_REQUEST,
  EDIT_BOOKING_SLOT_SUCCESS,
  EDIT_BOOKING_SLOT_FAIL,
  EDIT_BOOKING_SLOT_RESPONSE,
  DELETE_BOOKING_SLOT_REQUEST,
  DELETE_BOOKING_SLOT_SUCCESS,
  DELETE_BOOKING_SLOT_FAIL,
  DELETE_BOOKING_SLOT_RESPONSE,

 
} from "../types.js";

const initialState = {
  createBooking: undefined,
  createBookingSlot: undefined,
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

    case CREATE_BOOKING_SLOT_REQUEST:
      return { loading: true };
    case CREATE_BOOKING_SLOT_SUCCESS:
      return { ...state, loading: false, createBookingSlot: action.payload };
    case CREATE_BOOKING_SLOT_FAIL:
      return { ...state, loading: false, createBookingSlot: action.payload };
    case CREATE_BOOKING_SLOT_RESPONSE:
      return { ...state, loading: false, createBookingSlot: "" };

    case GETBYID_BOOKING_SLOT_REQUEST:
      return { loading: true };
    case GETBYID_BOOKING_SLOT_SUCCESS:
      return { ...state, loading: false, getByIdBookingSlot: action.payload };
    case GETBYID_BOOKING_SLOT_FAIL:
      return { ...state, loading: false, getByIdBookingSlot: action.payload };
    case GETBYID_BOOKING_SLOT_RESPONSE:
      return { ...state, loading: false, getByIdBookingSlot: "" };

    case EDIT_BOOKING_SLOT_REQUEST:
      return { loading: true };
    case EDIT_BOOKING_SLOT_SUCCESS:
      return { ...state, loading: false, editBookingSlot: action.payload };
    case EDIT_BOOKING_SLOT_FAIL:
      return { ...state, loading: false, editBookingSlot: action.payload };
    case EDIT_BOOKING_SLOT_RESPONSE:
      return { ...state, loading: false, editBookingSlot: "" };

    case DELETE_BOOKING_SLOT_REQUEST:
      return { loading: true };
    case DELETE_BOOKING_SLOT_SUCCESS:
      return { ...state, loading: false, deleteBookingSlot: action.payload };
    case DELETE_BOOKING_SLOT_FAIL:
      return { ...state, loading: false, deleteBookingSlot: action.payload };
    case DELETE_BOOKING_SLOT_RESPONSE:
      return { ...state, loading: false, deleteBookingSlot: "" };

      default:
        return state;
    }
};
