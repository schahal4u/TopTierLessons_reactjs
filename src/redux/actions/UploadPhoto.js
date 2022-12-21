import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors.js";
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

export const PhotoUploadAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_PHOTO_REQUEST,
    });

    const { data } = await axiosInstance.post(
      "User/UpdateProfilePic",
      formData
    );

    dispatch({
      type: UPLOAD_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_PHOTO_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const emptyProfileImageResponse = () => ({
  type: UPLOAD_PHOTO_RESET,
});

export const RegisterPhotoUploadAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_UPLOAD_PHOTO_REQUEST,
    });

    const { data } = await axiosInstance.post(
      "User/UpdateProfileImage",
      formData
    );

    dispatch({
      type: REGISTER_UPLOAD_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_UPLOAD_PHOTO_FAIL,
      payload: error?.response?.data,
    });
  }
};

///// upload documents

export const updateFileAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_FILE_REQUEST,
    });

    const { data } = await axiosInstance.post("User/UploadFile", formData);

    dispatch({
      type: UPLOAD_FILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_FILE_FAIL,
      payload: error?.response?.data,
    });
  }
};

// upload docs
export const UploadDocumentAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_DOCUMENT_REQUEST,
    });

    const { data } = await axiosInstance.post(
      "Document/UploadDocument",
      formData
    );

    dispatch({
      type: UPLOAD_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_DOCUMENT_FAIL,
      payload: error?.response?.data,
    });
  }
};
