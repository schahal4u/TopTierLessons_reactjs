import React, { useEffect, useState } from "react";
import "./SignIn.css";
import eye from "../assets/images/eye.png";
import eyeClose from "../assets/images/eye-close.png";

import facebook from "../assets/images/facebook.png";
import apple from "../assets/images/apple.png";
import google from "../assets/images/google.png";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminLoginAction,
  SocialLoginAction,
} from "../redux/actions/AdminLoginAction";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Form } from "react-bootstrap";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminInfo, error } = useSelector((state) => state.adminLogin);
  const { socialLoginInfo, errors } = useSelector((state) => state.socialLogin);
  const response = adminInfo?.statusCode;
  const errorResponse = error?.statusCode;
  const socialResponse = socialLoginInfo?.statusCode;

  const defautFormData = {
    email: "",
    password: "",
    grantType: "password",
  };
  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = (event) => {
    console.log("clicked");
    event.preventDefault();
    setValidated(true);
    if (formData.email === "" || formData.password === "") {
      // setFormData({ ...formData, email: "", password: "" });
    } else {
      setLoading(true);
      dispatch(AdminLoginAction(formData));
    }
  };

  const viewPassword = () => {
    setShow(!show);
  };

  const responseGoogle = (response) => {
    console.log("Google Response", response);
    if (response) {
      let obj = {
        grantType: "google",
        email: response?.Lu?.Bv,
        extrenalLoginToken: response?.Lu?.TW,
      };
      dispatch(SocialLoginAction(obj));
    }
  };

  const responseFacebook = (response) => {
    console.log("Facebook Response", response);
    let obj = {
      grantType: "facebook",
      email: response.email,
      extrenalLoginToken: response.id,
    };
    dispatch(SocialLoginAction(obj));
  };

  const socialResponseHandler = () => {
    if (socialResponse == 200) {
      // toast.success("Login Successfull");
      navigate("/");
    }
  };

  const responseHandler = () => {
    if (response == 200) {
      // toast.success("Login Successfull");
      navigate("/");
    }
    if (errorResponse == 401) {
      setLoading(false);
      toast.warn("User name or password is incorrect!");
    }
  };

  useEffect(() => {
    if (adminInfo || error) {
      responseHandler();
    }
  }, [adminInfo, error]);

  useEffect(() => {
    if (socialLoginInfo) {
      socialResponseHandler();
    }
  }, [socialLoginInfo]);

  return (
    <>
      <div className="signIn">
        <div className="container form_sign">
          <Form noValidate validated={validated} onSubmit={loginHandler}>
            <div className="signIn_Form">
              <h1>Sign In</h1>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  required
                  type="email"
                  className="form-control signin_inp mt-3"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormData}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Email is Required
                </Form.Control.Feedback>
              </Form.Group>
              <div className="eyeHandler">
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Control
                    type={show ? "text" : "password"}
                    className="form-control signinput_inp mt-3"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormData}
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ marginLeft: "65px" }}
                  >
                    Password is Required
                  </Form.Control.Feedback>
                </Form.Group>
                {show ? (
                  <img
                    src={eye}
                    alt="eye"
                    className="eye"
                    onClick={viewPassword}
                  />
                ) : (
                  <img
                    src={eyeClose}
                    alt="eye"
                    className="eye"
                    onClick={viewPassword}
                  />
                )}
              </div>
              <button
                type="submit"
                // onClick={() => loginHandler()}
                className="btn btn-primary signin_btn mt-4 mb-4"
              >
                {loading && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "15px" }}
                  ></span>
                )}
                SIGN IN
              </button>

              <div className="d-flex flex-row">
                <span className="hr_lines"></span>
                <span className="or_text">or</span>
                <span className="hr_lines"></span>
              </div>
              <div className="icon_divs">
                <FacebookLogin
                  appId="588082386211978"
                  fields="name,email,picture"
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <div onClick={renderProps.onClick} className="icon_boxes">
                      <img src={facebook} alt="fb" />
                    </div>
                  )}
                />
                <div className="icon_boxes">
                  <img src={apple} alt="apple" />
                </div>
                <GoogleLogin
                  clientId="785088467637-b80ith4r9p0ka8idiup9uoq98sofdlu5.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  render={(renderProps) => (
                    <div
                      className="icon_boxes"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <img src={google} alt="google" />
                    </div>
                  )}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div className="signIn_content">
                <p className="register_main_text">
                  if you havn’t Registed yet ?
                  <Link to="/coachsignup" className="register_text">
                    &nbsp;
                    <span className="register_text">Register Now</span>
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
