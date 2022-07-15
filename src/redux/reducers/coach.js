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
} from "../types.js";

const initialState = {
  getAllCoach: undefined,
  getCoachById: undefined,
  getCoachProfile: undefined,
};

export const GetAllCoachReducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case GET_COACH_REQUEST:
      return { loading: true };
    case GET_COACH_SUCCESS:
      return { ...state, loading: false, getAllCoach: action.payload };
    case GET_COACH_FAIL:
      return { ...state, loading: false, getAllCoach: action.payload };
    case GET_COACH_RESET:
      return { ...state, getAllCoach: null };

    case GET_COACHBYID_REQUEST:
      return { loading: true };
    case GET_COACHBYID_SUCCESS:
      return { ...state, loading: false, getCoachById: action.payload };
    case GET_COACHBYID_FAIL:
      return { ...state, loading: false, getCoachById: action.payload };
    case GET_COACHBYID_RESET:
      return { ...state, getCoachById: null };

    case GET_COACH_PROFILE_REQUEST:
      return { loading: true };
    case GET_COACH_PROFILE_SUCCESS:
      return { ...state, loading: false, getCoachProfile: action.payload };
    case GET_COACH_PROFILE_FAIL:
      return { ...state, loading: false, getCoachProfile: action.payload };
    case GET_COACH_PROFILE_RESET:
      return { ...state, getCoachProfile: null };

    default:
      return state;
  }
};
