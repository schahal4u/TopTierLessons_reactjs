import {
  GET_ALL_SKILLS_REQUEST,
  GET_ALL_SKILLS_SUCCESS,
  GET_ALL_SKILLS_FAIL,
  GET_ALL_SKILLS_RESET,
} from "../types.js";

const initialState = {
  getAllSkills: undefined,
};

export const getAllSkillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SKILLS_REQUEST:
      return { loading: true };
    case GET_ALL_SKILLS_SUCCESS:
      return { ...state, loading: false, getAllSkills: action.payload };
    case GET_ALL_SKILLS_FAIL:
      return { ...state, loading: false, getAllSkills: action.payload };
    case GET_ALL_SKILLS_RESET:
      return { ...state, getAllSkills: null };
    default:
      return state;
  }
};
