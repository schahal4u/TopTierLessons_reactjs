import React, { useEffect, useState } from "react";
import "./SignIn.css";
import eye from "../assets/images/eye.png";
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
import DefaultPopUp from "../components/common/DefaultPopUp";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminInfo, error } = useSelector((state) => state.adminLogin);
  const { socialLoginInfo, errors } = useSelector((state) => state.socialLogin);
  const response = adminInfo?.statusCode;
  const socialResponse = socialLoginInfo?.statusCode;

  console.log("response is", socialLoginInfo?.statusCode, error);

  const defautFormData = {
    email: "",
    password: "",
    grantType: "password",
  };
  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);
  const [popupDetails, setPopupDetails] = useState({
    shortMessage: "",
    longMessage: "",
    popupPlacement: "",
    popupColor: "",
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    if (formData.email === "" || formData.password === "") {
      setFormData({ ...formData, email: "", password: "" });
    } else {
      setLoading(true);
      dispatch(AdminLoginAction(formData));
    }
  };

  const viewPassword = () => {
    setShow(!show);
  };

  const responseGoogle = (response) => {
    let obj = {
      grantType: "google",
      email: response.Lu.Bv,
      extrenalLoginToken: response.Lu.TW,
    };
    dispatch(SocialLoginAction(obj));
  };

  const responseFacebook = (response) => {
    let obj = {
      grantType: "facebook",
      email: response.email,
      extrenalLoginToken: response.id,
    };
    dispatch(SocialLoginAction(obj));

    // console.log("Facebook response.............", response.email);
  };
  // const bringPopUp = (popupValues) => {
  //   setPopupDetails({ ...popupDetails, ...popupValues });
  //   setPopupStatus(true);
  //   setTimeout(() => {
  //     setPopupStatus(false);
  //   }, 5000);
  // };

  const socialResponseHandler = () => {
    if (socialResponse == 200) {
      navigate("/");
    }
  };

  const responseHandler = () => {
    if (response == 200) {
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (adminInfo) {
      responseHandler();
    }
  }, [adminInfo]);

  useEffect(() => {
    if (socialLoginInfo) {
      socialResponseHandler();
    }
  }, [socialLoginInfo]);

  return (
    <>
      {/* {popupStatus ? <DefaultPopUp popup={popupDetails} /> : null} */}

      <div className="signIn">
        <div className="container form_sign">
          <div className="signin_form">
            <h1>Sign In</h1>
            <input
              type="text"
              className="form-control signin_inp mt-3"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleFormData}
            />
            <div className="eyeHandler">
              <input
                type={show ? "text" : "password"}
                className="form-control signinput_inp mt-3"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
              />
              <img src={eye} alt="eye" className="eye" onClick={viewPassword} />
            </div>
            <button
              type="submit"
              onClick={() => loginHandler()}
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
                // autoLoad={true}
                fields="name,email,picture"
                // onClick={componentClicked}
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
                // buttonText="Login"
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="signIn_content">
              <p className="register_main_text">
                if you havn’t Registed yet ?
                <Link to="/lessonsignup" className="register_text">
                  &nbsp;
                  <span className="register_text">Register Now</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
