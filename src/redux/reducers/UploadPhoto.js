import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
} from "../types.js";

const initialState = {
  imgResponse: undefined,
  imgError: undefined,
};

export const PhotoUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_REQUEST:
      return { loading: true };
    case UPLOAD_PHOTO_SUCCESS:
      return { ...state, loading: false, imgResponse: action.payload };
    case UPLOAD_PHOTO_FAIL:
      return { ...state, loading: false, imgError: action.payload };
    default:
      return state;
  }
};
