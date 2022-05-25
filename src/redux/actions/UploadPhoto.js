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
