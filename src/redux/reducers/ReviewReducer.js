import {
  GET_ALL_REVIEW_REQUEST,
  GET_ALL_REVIEW_SUCCESS,
  GET_ALL_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from "../types";

const initialState = {
  review: undefined,
};

export const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEW_REQUEST:
      return { loading: true };
    case GET_ALL_REVIEW_SUCCESS:
      return { ...state, loading: false, reviewReducer: action.payload };
    case GET_ALL_REVIEW_FAIL:
      return { ...state, loading: false, reviewReducer: action.payload };
    default:
      return state;
  }
};

export const CreateReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, createReview: action.payload };
    case CREATE_REVIEW_FAIL:
      return { ...state, loading: false, createReview: action.payload };
    default:
      return state;
  }
};
