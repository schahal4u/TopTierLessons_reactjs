import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { AdminGetProfileDetailReducer } from "./reducers/AdminGetProfileDetailReducer";
import {
  AdminLoginReducer,
  SocialLoginReducer,
} from "./reducers/AdminLoginReducer";
import { AdminProfileUpdateReducer } from "./reducers/AdminProfileUpdateReducer";
import { ChangePasswordReducer } from "./reducers/ChangePassword";
import { GetAllSportsReducer } from "./reducers/GetAllSports";
import { LessonsRegisterReducer } from "./reducers/LessonsRegisterReducer";
import { PhotoUploadReducer } from "./reducers/UploadPhoto";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  adminLogin: AdminLoginReducer,
  socialLogin: SocialLoginReducer,
  lessonSignUp: LessonsRegisterReducer,
  getProfileDetail: AdminGetProfileDetailReducer,
  profileUpdate: AdminProfileUpdateReducer,
  changePassResponse: ChangePasswordReducer,
  profilePicResponse: PhotoUploadReducer,
  getAllSportsResponse: GetAllSportsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
