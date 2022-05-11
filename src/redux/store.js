import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { AdminLoginReducer } from "./reducers/AdminLoginReducer";
// import rootReducer from "./reducers/rootReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default function configureStore() {
//   return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// }

const rootReducer = combineReducers({
  adminLogin: AdminLoginReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
