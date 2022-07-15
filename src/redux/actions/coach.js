import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_COACH_REQUEST,
  GET_COACH_SUCCESS,
  GET_COACH_FAIL,
  GET_COACH_RESET,
  GET_COACHBYID_REQUEST,
  GET_COACHBYID_SUCCESS,
  GET_COACHBYID_FAIL,
  GET_COACHBYID_RESET,
  GET_COACH_PROFILE_REQUEST,
  GET_COACH_PROFILE_SUCCESS,
  GET_COACH_PROFILE_FAIL,
  GET_COACH_PROFILE_RESET,
} from "../types.js";

export const GetAllCoachAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COACH_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Sport/GetCoachBySportId",
      formData
    );
    dispatch({
      type: GET_COACH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COACH_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetAllCoachResponse = () => ({
  type: GET_COACH_RESET,
});

export const GetCoachByIdAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COACHBYID_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Sport/GetCoachBySportId",
      formData
    );
    dispatch({
      type: GET_COACHBYID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COACHBYID_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetCoacHProfileResponse = () => ({
  type: GET_COACHBYID_RESET,
});

export const GetCoachProfileAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COACH_PROFILE_REQUEST,
    });
    const { data } = await axiosInstance.post("Sport/GetCoachById", formData);
    dispatch({
      type: GET_COACH_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COACH_PROFILE_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetCoachProfileResponse = () => ({
  type: GET_COACH_PROFILE_RESET,
});
