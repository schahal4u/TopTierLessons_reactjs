import React, { useState } from "react";
import "./SignIn.css";
import eye from "../assets/images/eye.png";
import facebook from "../assets/images/facebook.png";
import apple from "../assets/images/apple.png";
import google from "../assets/images/google.png";
import { useDispatch, useSelector } from "react-redux";
import { AdminLoginAction } from "../redux/actions/AdminLoginAction";
import { Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { adminInfo, error } = useSelector((state) => state.adminLogin);
  console.log("response is", adminInfo, error);

  const defautFormData = {
    userName: "",
    password: "",
    grantType: "password",
  };
  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  console.log("form data", show);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    console.log("Clicked", formData);
    if (formData.userName === "" || formData.password === "") {
      setLoading(true);
      setFormData({ ...formData, userName: "", password: "" });
    } else {
      // if (formData.userName != "" && formData.password != "") {
      dispatch(AdminLoginAction(formData));
      // }
    }
  };

  const viewPassword = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="signIn">
        <div className="container form_sign">
          <div className="signin_form">
            <h1>Sign In</h1>
            <input
              type="text"
              className="form-control signin_inp mt-3"
              placeholder="Email"
              name="userName"
              value={formData.userName}
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
              SIGN IN
            </button>

            <div className="d-flex flex-row">
              <span className="hr_lines"></span>
              <span className="or_text">or</span>
              <span className="hr_lines"></span>
            </div>
            <div className="icon_divs">
              <div className="icon_boxes">
                <img src={facebook} alt="fb" />
              </div>
              <div className="icon_boxes">
                <img src={apple} alt="apple" />
              </div>
              <div className="icon_boxes">
                <img src={google} alt="google" />
              </div>
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
