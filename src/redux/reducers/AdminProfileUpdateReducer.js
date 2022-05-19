import {
  ADMIN_UPDATE_PROFILE_REQUEST,
  ADMIN_UPDATE_PROFILE_SUCCESS,
  ADMIN_UPDATE_PROFILE_FAIL,
  ADMIN_UPDATE_RESPONSE_RESET,
} from "../types.js";

export const AdminProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_PROFILE_SUCCESS:
      return { loading: false, updateProfileDetail: action.payload };
    case ADMIN_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_RESPONSE_RESET:
      return { loading: false, updateProfileDetail: undefined };
    default:
      return state;
  }
};
