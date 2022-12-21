import {
  GET_COACH_REQUEST,
  GET_COACH_SUCCESS,
  GET_COACH_FAIL,
  GET_COACH_RESET,
  GET_COACHBYID_REQUEST,
  GET_COACHBYID_SUCCESS,
  GET_COACHBYID_FAIL,
  GET_COACHBYID_RESET,
  GET_COACH_PROFILE_REQUEST,
  GET_COACH_PROFILE_SUCCESS,
  GET_COACH_PROFILE_FAIL,
  GET_COACH_PROFILE_RESET,
  GET_COACH_SLOTS_REQUEST,
  GET_COACH_SLOTS_SUCCESS,
  GET_COACH_SLOTS_FAIL,
  GET_COACH_SLOTS_RESET,
  GET_NEAR_BY_VENUE_REQUEST,
  GET_NEAR_BY_VENUE_SUCCESS,
  GET_NEAR_BY_VENUE_FAIL,
  DELETE_VENUE_REQUEST,
  DELETE_VENUE_SUCCESS,
  DELETE_VENUE_FAIL,
  DELETE_VENUE_RESET,
} from "../types.js";

const initialState = {
  getAllCoach: undefined,
  getCoachById: undefined,
  getCoachProfile: undefined,
  getCoachSlots: [],
  getNearbyVenue: [],
};

export const GetAllCoachReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COACH_REQUEST:
      return {
        loading: true,
      };
    case GET_COACH_SUCCESS:
      return {
        ...state,
        loading: false,
        getAllCoach: action.payload,
      };
    case GET_COACH_FAIL:
      return {
        ...state,
        loading: false,
        getAllCoach: action.payload,
      };
    case GET_COACH_RESET:
      return {
        ...state,
        getAllCoach: null,
      };

    case GET_COACHBYID_REQUEST:
      return {
        loading: true,
      };
    case GET_COACHBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        getCoachById: action.payload,
      };
    case GET_COACHBYID_FAIL:
      return {
        ...state,
        loading: false,
        getCoachById: action.payload,
      };
    case GET_COACHBYID_RESET:
      return {
        ...state,
        getCoachById: null,
      };

    case GET_COACH_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case GET_COACH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        getCoachProfile: action.payload,
      };
    case GET_COACH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        getCoachProfile: action.payload,
      };
    case GET_COACH_PROFILE_RESET:
      return {
        ...state,
        getCoachProfile: null,
      };

    case GET_COACH_SLOTS_REQUEST:
      return {
        loading: true,
      };
    case GET_COACH_SLOTS_SUCCESS:
      return {
        ...state,
        loading: false,
        getCoachSlots: action.payload,
      };
    case GET_COACH_SLOTS_FAIL:
      return {
        ...state,
        loading: false,
        getCoachSlotsstate: action.payload,
      };
    case GET_COACH_SLOTS_RESET:
      return {
        ...state,
        getCoachSlots: null,
      };
    case GET_NEAR_BY_VENUE_REQUEST:
      return {
        loading: true,
      };
    case GET_NEAR_BY_VENUE_SUCCESS:
      return {
        ...state,
        loading: false,
        getNearbyVenue: action.payload,
      };
    case GET_NEAR_BY_VENUE_FAIL:
      return {
        ...state,
        loading: false,
        getNearbyVenue: action.payload,
      };

    case DELETE_VENUE_REQUEST:
      return {
        loading: true,
      };
    case DELETE_VENUE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteVenue: action.payload,
      };
    case DELETE_VENUE_FAIL:
      return {
        ...state,
        loading: false,
        deleteVenue: action.payload,
      };
    case DELETE_VENUE_RESET:
      return {
        ...state,
        deleteVenue: null,
      };

    default:
      return state;
  }
};
