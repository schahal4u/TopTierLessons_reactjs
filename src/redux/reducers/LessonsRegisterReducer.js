import {
  LESSONS_REGISTER_REQUEST,
  LESSONS_REGISTER_SUCCESS,
  LESSONS_REGISTER_FAIL,
} from "../types.js";

export const LessonsRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case LESSONS_REGISTER_REQUEST:
      return { loading: true };
    case LESSONS_REGISTER_SUCCESS:
      return { loading: false, lessonInfo: action.payload };
    case LESSONS_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
