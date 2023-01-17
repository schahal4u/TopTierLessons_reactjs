import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
  GET_ALL_SKILLS_REQUEST,
  GET_ALL_SKILLS_SUCCESS,
  GET_ALL_SKILLS_FAIL,
  GET_ALL_SKILLS_RESET,
} from "../types.js";

export const getAllSkillsAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SKILLS_REQUEST,
    });
    const { data } = await axiosInstance.post("Admin/GetAllSkills", formData);
    dispatch({
      type: GET_ALL_SKILLS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SKILLS_FAIL,
      payload: error?.response?.data,
    });
  }
};

export const resetAllSkillsResponse = () => ({
  type: GET_ALL_SKILLS_RESET,
});
