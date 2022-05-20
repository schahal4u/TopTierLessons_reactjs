import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors.js";
import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
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
