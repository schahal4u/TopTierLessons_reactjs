import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { AdminGetProfileDetailReducer } from "./reducers/AdminGetProfileDetailReducer";
import {
  AdminLoginReducer,
  SocialLoginReducer,
} from "./reducers/AdminLoginReducer";
import { AdminProfileUpdateReducer } from "./reducers/AdminProfileUpdateReducer";
import { CreateBookingReducer } from "./reducers/Bookings";
import { ChangePasswordReducer } from "./reducers/ChangePassword";
import { GetAllCoachReducer } from "./reducers/coach";
import { ContactUsReducer } from "./reducers/common";
import { GetAllSportsReducer } from "./reducers/GetAllSports";
import { LessonsRegisterReducer } from "./reducers/LessonsRegisterReducer";
import { CreatePaymentReducer } from "./reducers/Payment";
import {
  PhotoUploadReducer,
  RegisterPhotoUploadReducer,
} from "./reducers/UploadPhoto";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  adminLogin: AdminLoginReducer,
  socialLogin: SocialLoginReducer,
  lessonSignUp: LessonsRegisterReducer,
  getProfileDetail: AdminGetProfileDetailReducer,
  profileUpdate: AdminProfileUpdateReducer,
  changePassResponse: ChangePasswordReducer,
  profilePicResponse: PhotoUploadReducer,
  registerPicResponse: RegisterPhotoUploadReducer,
  getAllSportsResponse: GetAllSportsReducer,
  getAllCoachResponse: GetAllCoachReducer,
  contactUsResponse: ContactUsReducer,
  createBookingResponse: CreateBookingReducer,
  createPaymentResponse: CreatePaymentReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
