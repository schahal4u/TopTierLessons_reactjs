import {
  EMAIL_TEMPLATE_REQUEST,
  EMAIL_TEMPLATE_SUCCESS,
  EMAIL_TEMPLATE_FAIL,
} from "../types";

const initialState = {
  review: undefined,
};

export const EmailTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_TEMPLATE_REQUEST:
      return { loading: true };
    case EMAIL_TEMPLATE_SUCCESS:
      return { ...state, loading: false, emailTemplate: action.payload };
    case EMAIL_TEMPLATE_FAIL:
      return { ...state, loading: false, emailTemplate: action.payload };
    default:
      return state;
  }
};
