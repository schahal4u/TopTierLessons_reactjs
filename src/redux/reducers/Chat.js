import {
  GET_BOOKING_USER_REQUEST,
  GET_BOOKING_USER_SUCCESS,
  GET_BOOKING_USER_FAIL,
  GET_BY_CHAT_ID_REQUEST,
  GET_BY_CHAT_ID_SUCCESS,
  GET_BY_CHAT_ID_FAIL,
  GET_BY_CHAT_ID_RESET,
  GET_BOOKING_USER_RESET,
} from "../types";

const initialState = {
  chatGetById: undefined,
  getChatBookingUser: undefined,
};

export const ChatModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING_USER_REQUEST:
      return { loading: true };
    case GET_BOOKING_USER_SUCCESS:
      return { ...state, loading: false, getChatBookingUser: action.payload };
    case GET_BOOKING_USER_FAIL:
      return { ...state, loading: false, getChatBookingUser: action.payload };
    // case GET_BOOKING_USER_RESET:
    //   return { ...state, getChatBookingUser: null };

    default:
      return state;
  }
};
export const getChatByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BY_CHAT_ID_REQUEST:
      return { loading: true };
    case GET_BY_CHAT_ID_SUCCESS:
      return { ...state, loading: false, chatGetById: action.payload };
    case GET_BY_CHAT_ID_FAIL:
      return { ...state, loading: false, chatGetById: action.payload };
    case GET_BY_CHAT_ID_RESET:
      return { ...state, chatGetById: null };

    default:
      return state;
  }
};
