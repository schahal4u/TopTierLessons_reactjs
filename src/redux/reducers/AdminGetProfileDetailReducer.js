import {
  ADMIN_GET_PROFILE_REQUEST,
  ADMIN_GET_PROFILE_SUCCESS,
  ADMIN_GET_PROFILE_FAIL,
  ADMIN_GET_PROFILE_RESET,
} from "../types.js";

const initialState = {
  profileDetail: undefined,
  profileError: undefined,
};

export const AdminGetProfileDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_PROFILE_REQUEST:
      return { loading: true };
    case ADMIN_GET_PROFILE_SUCCESS:
      return { ...state, loading: false, profileDetail: action.payload };
    case ADMIN_GET_PROFILE_FAIL:
      return { ...state, loading: false, profileError: action.payload };
    default:
      return state;
  }
};

export const AdminProfileGetReset = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_PROFILE_RESET:
      return { ...state, loading: false, profileDetail: undefined };
  }
};
