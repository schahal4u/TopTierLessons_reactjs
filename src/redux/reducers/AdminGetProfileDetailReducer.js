import {
  ADMIN_GET_PROFILE_REQUEST,
  ADMIN_GET_PROFILE_SUCCESS,
  ADMIN_GET_PROFILE_FAIL,
} from "../types.js";

export const AdminGetProfileDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_PROFILE_REQUEST:
      return { loading: true };
    case ADMIN_GET_PROFILE_SUCCESS:
      return { loading: false, profileDetail: action.payload };
    case ADMIN_GET_PROFILE_FAIL:
      return { loading: false, profileError: action.payload };
    default:
      return state;
  }
};
