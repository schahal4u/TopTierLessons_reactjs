import { axiosInstance } from "../ApiInterceptor/Axios_Interceptors";
import {
    GET_ALL_VENUE_REQUEST,
    GET_ALL_VENUE_SUCCESS,
    GET_ALL_VENUE_FAIL,
    GET_ALL_VENUE_RESPONSE,
} from "../types"

export const GetAllCoachVenueAction = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_VENUE_REQUEST
        });
        const { data } = await axiosInstance.post("Venue/GetAllCoachVenues", formData);

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
}

