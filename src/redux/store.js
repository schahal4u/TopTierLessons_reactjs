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
import { CapturePaymentReducer } from "./reducers/CapturePayment";
import {
  PhotoUploadReducer,
  RegisterPhotoUploadReducer,
  UploadDocumentReducer,
  UploadFileReducer,
} from "./reducers/UploadPhoto";
import { GetAllBookingReducer } from "./reducers/GetAllBookingReducer";
import { GetAllSlotsReducer } from "./reducers/GetTimeSlotsReducer";
import { GetALlCoachVenueReducer } from "./reducers/GetAllCoachVenueReducer";
import { ChatModuleReducer, getChatByIdReducer } from "./reducers/Chat";
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
  getAllBookingResponse: GetAllBookingReducer,
  createPaymentResponse: CreatePaymentReducer,
  capturePaymentResponse: CapturePaymentReducer,
  UploadDocument: UploadDocumentReducer,
  uploadFile: UploadFileReducer,
  getAllSlots: GetAllSlotsReducer,
  coachVenue: GetALlCoachVenueReducer,
  chatModule: ChatModuleReducer,
  getChatById: getChatByIdReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
