import {
  ADMIN_UPDATE_PROFILE_REQUEST,
  ADMIN_UPDATE_PROFILE_SUCCESS,
  ADMIN_UPDATE_PROFILE_FAIL,
  ADMIN_UPDATE_RESPONSE_RESET,
} from "../types.js";

const initialState = {
  updateProfileDetail: undefined,
  error: undefined,
};

export const AdminProfileUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, updateProfileDetail: action.payload };
    case ADMIN_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const AdminProfileUpdateReset = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_RESPONSE_RESET:
      return { ...state, loading: false, updateProfileDetail: undefined };
  }
};
