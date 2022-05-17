import axios from "axios";
import {
  LESSONS_REGISTER_REQUEST,
  LESSONS_REGISTER_SUCCESS,
  LESSONS_REGISTER_FAIL,
} from "../types.js";

// user login

export const LessonsRegisterAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: LESSONS_REGISTER_REQUEST,
    });

    const { data } = await axios.post(
      "http://35.154.186.154:8765/api/v1.0/Auth/Register",
      formData
    );
    dispatch({
      type: LESSONS_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSONS_REGISTER_FAIL,
      //   payload: error?.response?.data,
      payload: error,
    });
  }
};
