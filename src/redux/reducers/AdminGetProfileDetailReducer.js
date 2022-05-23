import {
  GET_PROFILE_DETAIL_REQUEST,
  GET_PROFILE_DETAIL_SUCCESS,
  GET_PROFILE_DETAIL_FAIL,
  GET_PROFILE_DETAIL_RESET,
} from "../types.js";

const initialState = {
  profileDetail: undefined,
  profileError: undefined,
};

export const AdminGetProfileDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_DETAIL_REQUEST:
      return {...state, loading: true };
    case GET_PROFILE_DETAIL_SUCCESS:
      return { ...state, loading: false, profileDetail: action.payload };
    case GET_PROFILE_DETAIL_FAIL:
      return { ...state, loading: false, profileError: action.payload };
    default:
      return state;
  }
};

export const AdminProfileGetReset = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_DETAIL_RESET:
      return { ...state, loading: false, profileDetail: undefined };
  }
};
