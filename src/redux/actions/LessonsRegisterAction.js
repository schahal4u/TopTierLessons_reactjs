import axios from "axios";
import {
  LESSONS_REGISTER_REQUEST,
  LESSONS_REGISTER_SUCCESS,
  LESSONS_REGISTER_FAIL,
  LESSONS_REGISTER_RESET
} from "../types.js";

// user login

export const LessonsRegisterAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: LESSONS_REGISTER_REQUEST,
    });

    const { data } = await axios.post(
      "https://toptierlessons.com:4437/api/v1.0/Auth/Register",
      formData
    );
    dispatch({
      type: LESSONS_REGISTER_SUCCESS,
      payload: data,
    });
     localStorage.setItem("userData", JSON.stringify(data.data));
     localStorage.setItem("token", JSON.stringify(data.data.access_token));
  } catch (error) {
    dispatch({
      type: LESSONS_REGISTER_FAIL,
        payload: error?.response?.data,
    });
  }
};

export const emptyRegisterResponse = () => ({
  type: LESSONS_REGISTER_RESET,
});
