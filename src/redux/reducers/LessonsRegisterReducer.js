import {
  LESSONS_REGISTER_REQUEST,
  LESSONS_REGISTER_SUCCESS,
  LESSONS_REGISTER_FAIL,
  LESSONS_REGISTER_RESET,
} from "../types.js";

const initialState = {
  lessonInfo: undefined,
};

export const LessonsRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LESSONS_REGISTER_REQUEST:
      return { loading: true };
    case LESSONS_REGISTER_SUCCESS:
      return { ...state, loading: false, lessonInfo: action.payload };
    case LESSONS_REGISTER_FAIL:
      return { ...state, loading: false, lessonInfo: action.payload };
    case LESSONS_REGISTER_RESET:
      return { ...state, loading: false, lessonInfo: null };
    default:
      return state;
  }
};
