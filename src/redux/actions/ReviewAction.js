import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_ALL_REVIEW_REQUEST,
  GET_ALL_REVIEW_SUCCESS,
  GET_ALL_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from "../types";

export const ReviewAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_REVIEW_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "ReviewRating/GetAllReviews",
      formData
    );
    dispatch({
      type: GET_ALL_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_REVIEW_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const CreateReviewAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_REVIEW_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "ReviewRating/CreateReviewRating",
      formData
    );
    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: error?.response?.data,
    });
  }
};
