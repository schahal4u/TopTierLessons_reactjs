import {
  GET_ALL_VENUE_REQUEST,
  GET_ALL_VENUE_SUCCESS,
  GET_ALL_VENUE_FAIL,
} from "../types";

const initialState = {
  coachVenue: undefined,
};

export const GetALlCoachVenueReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VENUE_REQUEST:
      return { loading: true };
    case GET_ALL_VENUE_SUCCESS:
      return { ...state, loading: false, getAllVenue: action.payload };
    case GET_ALL_VENUE_FAIL:
      return { ...state, loading: false, getAllVenue: action.payload };
    default:
      return state;
  }
};
