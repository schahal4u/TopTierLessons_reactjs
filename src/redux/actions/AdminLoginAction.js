import axios from "axios";
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
} from "../types.js";

// user login

export const AdminLoginAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      "http://35.154.186.154:4437/api/v1.0/Auth/SignIn",
      //   "http://3.110.189.235:3000/Admin/Login",
      formData
    );
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("token", JSON.stringify(data.data[0].accesstoken));
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      //   payload: error?.response?.data,
      payload: error,
    });
  }
};
