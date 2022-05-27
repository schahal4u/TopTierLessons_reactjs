import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_RESET,
} from "../types.js";

const initialState = {
  passwordResponse: undefined,
};

export const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, passwordResponse: action.payload };
    case CHANGE_PASSWORD_FAIL:
      return { ...state, loading: false, passwordResponse: action.payload };
    case CHANGE_PASSWORD_RESET:
      return { ...state, loading: false, passwordResponse: null };
    default:
      return state;
  }
};
