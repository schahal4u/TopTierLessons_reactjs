import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_RESPONSE_RESET,
  DELETE_CHILD_REQUEST,
  DELETE_CHILD_SUCCESS,
  DELETE_CHILD_FAIL,
  DELETE_CHILD_RESET,
  GET_CHILD_BY_ID_REQUEST,
  GET_CHILD_BY_ID_SUCCESS,
  GET_CHILD_BY_ID_FAIL,
  GET_CHILD_BY_ID_RESET,
  UPDATE_CHILD_REQUEST,
  UPDATE_CHILD_SUCCESS,
  UPDATE_CHILD_FAIL,
  UPDATE_CHILD_RESET,
} from "../types.js";

const initialState = {
  updateProfileDetail: undefined,
  error: undefined,
  deleteChild: undefined,
  getByChildId: undefined,
  updateChild: undefined,
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
    case DELETE_CHILD_REQUEST:
      return { loading: true };
    case DELETE_CHILD_SUCCESS:
      return { ...state, loading: false, deleteChild: action.payload };
    case DELETE_CHILD_FAIL:
      return { ...state, loading: false, deleteChild: action.payload };
    case DELETE_CHILD_RESET:
      return { ...state, loading: false, deleteChild: null };
    case GET_CHILD_BY_ID_REQUEST:
      return { loading: true };
    case GET_CHILD_BY_ID_SUCCESS:
      return { ...state, loading: false, getByChildId: action.payload };
    case GET_CHILD_BY_ID_FAIL:
      return { ...state, loading: false, getByChildId: action.payload };
    case GET_CHILD_BY_ID_RESET:
      return { ...state, loading: false, getByChildId: null };
    case UPDATE_CHILD_REQUEST:
      return { loading: true };
    case UPDATE_CHILD_SUCCESS:
      return { ...state, loading: false, updateChild: action.payload };
    case UPDATE_CHILD_FAIL:
      return { ...state, loading: false, updateChild: action.payload };
    case UPDATE_CHILD_RESET:
      return { ...state, loading: false, updateChild: null };
    default:
      return state;
  }
};
