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
import {
  DeleteBookingReducer,
  GetAllBookingDetailsByIdReducer,
  GetAllBookingReducer,
  PreviousBookingReducer,
  upcomingBookingsReducer,
} from "./reducers/GetAllBookingReducer";
import { GetAllSlotsReducer } from "./reducers/GetTimeSlotsReducer";
import {
  GetALlCoachVenueReducer,
  GetVenueByIdReducer,
} from "./reducers/GetAllCoachVenueReducer";
import { CreateReviewReducer, ReviewReducer } from "./reducers/ReviewReducer";
import { EmailTemplateReducer } from "./reducers/EmailTemplateReducer";
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
  previousBooking:PreviousBookingReducer,
  upcomingBooking:upcomingBookingsReducer,
  deleteBooking:DeleteBookingReducer,
  getAllBookingResponse: GetAllBookingReducer,
  getAllBookingDetailsById: GetAllBookingDetailsByIdReducer,
  createPaymentResponse: CreatePaymentReducer,
  capturePaymentResponse: CapturePaymentReducer,
  UploadDocument: UploadDocumentReducer,
  uploadFile: UploadFileReducer,
  getAllSlots: GetAllSlotsReducer,
  coachVenue: GetALlCoachVenueReducer,
  venueById: GetVenueByIdReducer,
  getReviewReducer: ReviewReducer,
  createReview: CreateReviewReducer,
  emailTemplateReducer: EmailTemplateReducer,
  chatModule: ChatModuleReducer,
  getChatById: getChatByIdReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
