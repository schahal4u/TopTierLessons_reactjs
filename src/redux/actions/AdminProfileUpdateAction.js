// import axios from "axios";
import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors.js";
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

export const AdminProfileUpdateAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axiosInstance.post(
      "User/UpdateUserProfile",
      formData
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error,
    });
  }
};

export const emptyUpdateProfileResponse = () => ({
  type: UPDATE_RESPONSE_RESET,
});

export const deleteChildAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CHILD_REQUEST,
    });

    const { data } = await axiosInstance.post("User/DeleteChild", formData);
    dispatch({
      type: DELETE_CHILD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CHILD_FAIL,
      payload: error,
    });
  }
};

export const deleteChildResponse = () => ({
  type: DELETE_CHILD_RESET,
});

export const getChildByIdAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CHILD_BY_ID_REQUEST,
    });

    const { data } = await axiosInstance.post("User/GetChildById", formData);
    dispatch({
      type: GET_CHILD_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHILD_BY_ID_FAIL,
      payload: error,
    });
  }
};

export const getChildByIdResponse = () => ({
  type: GET_CHILD_BY_ID_RESET,
});

export const updateChildAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CHILD_REQUEST,
    });

    const { data } = await axiosInstance.post("/User/UpdateChild", formData);
    dispatch({
      type: UPDATE_CHILD_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_CHILD_FAIL,
      payload: error,
    });
  }
};

export const updateChildResponse = () => ({
  type: UPDATE_CHILD_RESET,
});
