import {
  GET_ALL_SPORTS_REQUEST,
  GET_ALL_SPORTS_SUCCESS,
  GET_ALL_SPORTS_FAIL,
  GET_ALL_SPORTS_RESET,
} from "../types.js";

const initialState = {
  getAllSports: undefined,
};

export const GetAllSportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPORTS_REQUEST:
      return { loading: true };
    case GET_ALL_SPORTS_SUCCESS:
      return { ...state, loading: false, getAllSports: action.payload };
    case GET_ALL_SPORTS_FAIL:
      return { ...state, loading: false, getAllSports: action.payload };
    case GET_ALL_SPORTS_RESET:
      return { ...state, getAllSports: null };
    default:
      return state;
  }
};
