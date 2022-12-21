import {
  GET_ALL_SLOTS_REQUEST,
  GET_ALL_SLOTS_SUCCESS,
  GET_ALL_SLOTS_FAIL,
} from "../types.js";

const initialState = {
  getAllSlots: undefined,
};

export const GetAllSlotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SLOTS_REQUEST:
      return { loading: true };
    case GET_ALL_SLOTS_SUCCESS:
      return { ...state, loading: false, getAllSlots: action.payload };
    case GET_ALL_SLOTS_FAIL:
      return { ...state, loading: false, getAllSlots: action.payload };

    default:
      return state;
  }
};
