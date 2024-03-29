import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_ALL_COACH_VENUE_REQUEST,
  GET_ALL_COACH_VENUE_SUCCESS,
  GET_ALL_COACH_VENUE_FAIL,
  GET_ALL_VENUE_REQUEST,
  GET_ALL_VENUE_SUCCESS,
  GET_ALL_VENUE_FAIL,
  GET_ALL_VENUE_RESPONSE,
  GET_VENUE_BY_ID_REQUEST,
  GET_VENUE_BY_ID_SUCCESS,
  GET_VENUE_BY_ID_FAIL,
} from "../types";

export const GetAllCoachVenueAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_COACH_VENUE_REQUEST,
    });
    const { data } = await axiosInstance.post(
      "Venue/GetAllCoachVenues",
      formData
    );

    dispatch({
      type: GET_ALL_COACH_VENUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_COACH_VENUE_FAIL,
      payload: error?.response?.data,
    });
  }
};
export const GetAllVenueAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_VENUE_REQUEST,
    });
    const { data } = await axiosInstance.post("Venue/GetAllVenues", formData);

    dispatch({
      type: GET_ALL_VENUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_VENUE_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const GetVenueByIdAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_VENUE_BY_ID_REQUEST,
    });
    const { data } = await axiosInstance.post("Venue/GetVenueById", formData);

    dispatch({
      type: GET_VENUE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_VENUE_BY_ID_FAIL,
      payload: error?.response?.data,
    });
  }
};
