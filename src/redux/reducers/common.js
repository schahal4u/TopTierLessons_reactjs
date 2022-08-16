import {
  CONTACT_US_FAIL,
  CONTACT_US_REQUEST,
  CONTACT_US_RESET,
  CONTACT_US_SUCCESS,
} from "../types";

const initialState = {
  contactUsRes: undefined,
};

export const ContactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_US_REQUEST:
      return { loading: true };
    case CONTACT_US_SUCCESS:
      return { ...state, loading: false, contactUsRes: action.payload };
    case CONTACT_US_FAIL:
      return { ...state, loading: false, contactUsRes: action.payload };
    case CONTACT_US_RESET:
      return { ...state, contactUsRes: null };

    default:
      return state;
  }
};
