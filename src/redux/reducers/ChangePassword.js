import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "../types.js";

const initialState = {
  passwordResponse: undefined,
  passwordError: undefined,
};

export const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, passwordResponse: action.payload };
    case CHANGE_PASSWORD_FAIL:
      return { ...state, loading: false, passwordError: action.payload };
    default:
      return state;
  }
};
