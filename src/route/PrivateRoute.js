import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isSignIn } from "../utils";

const PrivateRoute = ({ children }) => {
  return isSignIn() ? children : <Navigate to="/signIn" />;
};

export default PrivateRoute;
