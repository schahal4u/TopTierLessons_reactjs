import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
  UPLOAD_PHOTO_RESET,
  REGISTER_UPLOAD_PHOTO_REQUEST,
  REGISTER_UPLOAD_PHOTO_SUCCESS,
  REGISTER_UPLOAD_PHOTO_FAIL,
  REGISTER_UPLOAD_PHOTO_RESET,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL,
} from "../types.js";

const initialState = {
  imgResponse: undefined,
  picResponse: undefined,
};

export const PhotoUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_REQUEST:
      return { loading: true };
    case UPLOAD_PHOTO_SUCCESS:
      return { ...state, loading: false, imgResponse: action.payload };
    case UPLOAD_PHOTO_FAIL:
      return { ...state, loading: false, imgResponse: action.payload };
    case UPLOAD_PHOTO_RESET:
      return { ...state, loading: false, imgResponse: null };
    default:
      return state;
  }
};
export const RegisterPhotoUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_UPLOAD_PHOTO_REQUEST:
      return { loading: true };
    case REGISTER_UPLOAD_PHOTO_SUCCESS:
      return { ...state, loading: false, picResponse: action.payload };
    case REGISTER_UPLOAD_PHOTO_FAIL:
      return { ...state, loading: false, picResponse: action.payload };
    // case REGISTER_UPLOAD_PHOTO_RESET:
    //   return { ...state, loading: false, picResponse: null };
    default:
      return state;
  }
};

// upload file
export const UploadFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return { loading: true };
    case UPLOAD_FILE_SUCCESS:
      return { ...state, loading: false, uploadFile: action.payload };
    case UPLOAD_FILE_FAIL:
      return { ...state, loading: false, uploadFile: action.payload };
    default:
      return state;
  }
};

// upload docs
export const UploadDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT_REQUEST:
      return { loading: true };
    case UPLOAD_DOCUMENT_SUCCESS:
      return { ...state, loading: false, uploadDocument: action.payload };
    case UPLOAD_DOCUMENT_FAIL:
      return { ...state, loading: false, uploadDocument: action.payload };
    default:
      return state;
  }
};
