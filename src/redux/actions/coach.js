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
  GET_COACH_SLOTS_REQUEST,
  GET_COACH_SLOTS_SUCCESS,
  GET_COACH_SLOTS_FAIL,
  GET_COACH_SLOTS_RESET,
  GET_NEAR_BY_VENUE_REQUEST,
  GET_NEAR_BY_VENUE_SUCCESS,
  GET_NEAR_BY_VENUE_FAIL,
  DELETE_VENUE_REQUEST,
  DELETE_VENUE_SUCCESS,
  DELETE_VENUE_FAIL,
  DELETE_VENUE_RESET,
  GET_COACH_BY_VENUE_ID_REQUEST,
  GET_COACH_BY_VENUE_ID_SUCCESS,
  GET_COACH_BY_VENUE_ID_FAIL,
  GET_COACH_BY_VENUE_ID_RESET,
  GET_COACH_BY_RADIUS_REQUEST,
  GET_COACH_BY_RADIUS_SUCCESS,
  GET_COACH_BY_RADIUS_FAIL,
  GET_COACH_BY_RADIUS_RESET,
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
      "Sport/GetCoachByFilter",
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

export const GetCoachSlotsAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COACH_SLOTS_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "TimeSlots/CheckAvailability",
      formData
    );
    dispatch({
      type: GET_COACH_SLOTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COACH_SLOTS_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const GetNearbyVenueAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NEAR_BY_VENUE_REQUEST,
    });
    const { data } = await axiosInstance.post("Sport/GetNearbyVenue", formData);
    dispatch({
      type: GET_NEAR_BY_VENUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NEAR_BY_VENUE_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const ResetCoachSlotsResponse = () => ({
  type: GET_COACH_SLOTS_RESET,
});

export const deleteCoachVenueAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_VENUE_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Venue/DeleteCoachVenue",
      formData
    );
    dispatch({
      type: DELETE_VENUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_VENUE_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const deleteCoachVenueResponse = () => ({
  type: DELETE_VENUE_RESET,
});

// get Coach by VenueId
export const getCoachByVenueIdAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COACH_BY_VENUE_ID_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Sport/GetCoachesByVenueId",
      formData
    );
    dispatch({
      type: GET_COACH_BY_VENUE_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COACH_BY_VENUE_ID_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const getCoachByVenueIdResponse = () => ({
  type: GET_COACH_BY_VENUE_ID_RESET,
});

// get Coach by user radius
export const getCoachesByUserRadiusAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COACH_BY_RADIUS_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Sport/GetCoachesByUserRadius",
      formData
    );
    dispatch({
      type: GET_COACH_BY_RADIUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COACH_BY_RADIUS_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const getCoachesByUserRadiusResponse = () => ({
  type: GET_COACH_BY_RADIUS_RESET,
});
