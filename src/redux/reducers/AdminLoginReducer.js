import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAIL,
  SOCIAL_LOGOUT,
} from "../types.js";

const initialState = {
  adminInfo: undefined,
  error: undefined,
  socialLoginInfo: undefined,
  errors: undefined,
};

export const AdminLoginReducer = (state = initialState, action) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { ...state, loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const SocialLoginReducer = (state = initialState, action) => {
  // console.log("Social action", action.payload);
  switch (action.type) {
    case SOCIAL_LOGIN_REQUEST:
      return { loading: true };
    case SOCIAL_LOGIN_SUCCESS:
      return { ...state, loading: false, socialLoginInfo: action.payload };
    case SOCIAL_LOGIN_FAIL:
      return { ...state, loading: false, errors: action.payload };
    case SOCIAL_LOGOUT:
      return {};
    default:
      return state;
  }
};
