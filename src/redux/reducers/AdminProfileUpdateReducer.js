import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_RESPONSE_RESET,
} from "../types.js";

const initialState = {
  updateProfileDetail: undefined,
  error: undefined,
};

export const AdminProfileUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, updateProfileDetail: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_RESPONSE_RESET:
      return { ...state, updateProfileDetail: null };
    default:
      return state;
  }
};

